import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { ChatConversation, User, DetailedMessage } from '../types';
import { ChevronLeftIcon } from '../constants';


// ----------------------------------------------------
// ICONS
// ----------------------------------------------------

const PencilIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
</svg>
);


const UserPlusIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
</svg>
);


const LinkIconSVG: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>
);


const UsersIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg>
);


const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
);


const CameraIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
</svg>
);


const DocumentIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25" />
</svg>
);


const ArrowDownTrayIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5" />
</svg>
);


const UserMinusIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6" />
</svg>
);


const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75" />
</svg>
);


//////////////////////////////////////////////////////////////////
// helper
//////////////////////////////////////////////////////////////////

const getInitials = (name?: string): string => {

if (!name || name.trim() === '') return 'U';

const parts = name.match(/\b\w/g) || [];

return (parts.map(part => part.toUpperCase()).join('') || 'U').substring(0,2);

};



//////////////////////////////////////////////////////////////////
// MODAL COMPONENT
//////////////////////////////////////////////////////////////////

interface ModalProps {

isOpen:boolean;

onClose:()=>void;

title:string;

children:React.ReactNode;

size?:'sm'|'md'|'lg'|'xl';

}



const Modal:React.FC<ModalProps> = ({isOpen,onClose,title,children,size='lg'})=>{

if(!isOpen) return null;

const sizeClasses={

sm:'max-w-sm',

md:'max-w-md',

lg:'max-w-lg',

xl:'max-w-xl'

};

return(

<div

className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"

onClick={onClose}

>

<div

className={`bg-[var(--component-background)] p-6 rounded-xl shadow-2xl w-full ${sizeClasses[size]} border border-[var(--border-primary)]`}

onClick={(e)=>e.stopPropagation()}

>

<div className="flex justify-between items-center mb-5">

<h2 className="text-xl font-semibold text-[var(--text-primary)]">

{title}

</h2>

<button

onClick={onClose}

className="text-neutral-500 hover:text-black dark:hover:text-white"

>

<XMarkIcon/>

</button>

</div>


<div className="space-y-4 custom-scrollable max-h-[70vh] overflow-y-auto pr-2">

{children}

</div>

</div>

</div>

);

};

export const TeamDetailPage: React.FC = () => {

const { teamId } = useParams<{ teamId:string }>();

const navigate = useNavigate();

const location = useLocation();


const { 

currentUser,

getUserById,

addNotification,

users:allUsersFromContext

} = useAppContext();



//////////////////////////////////////////////////////////////
// STATE
//////////////////////////////////////////////////////////////

const [activeMediaTab,setActiveMediaTab] = useState<'media'|'links'>('media');

const [isEditModalOpen,setIsEditModalOpen] = useState(false);

const [isAddMemberModalOpen,setIsAddMemberModalOpen] = useState(false);

const [isConfirmRemoveModalOpen,setIsConfirmRemoveModalOpen] = useState(false);


const [selectedUsersToAdd,setSelectedUsersToAdd] = useState<string[]>([]);

const [memberToRemove,setMemberToRemove] = useState<User | null>(null);


const [teamDetails,setTeamDetails] = useState<(ChatConversation & {members:User[]}) | null>(

location.state?.team || null

);


const [editingTeamName,setEditingTeamName] = useState('');

const [editingTeamDescription,setEditingTeamDescription] = useState('');

const [editingTeamImagePreview,setEditingTeamImagePreview] = useState<string | null>(null);


const teamImageInputRef = useRef<HTMLInputElement>(null);



//////////////////////////////////////////////////////////////
// TEAM DATA FETCH
//////////////////////////////////////////////////////////////

useEffect(()=>{

if(!teamId) return;

const fetchTeamData = async()=>{


if(location.state?.team){

const rawTeam = location.state.team;


const members =

rawTeam.memberIds?.map((id:string)=>getUserById(id)).filter(Boolean) || [];


//////////////////////////////////////////////////////////////
// ADMIN DETECTION (SAFE)
//////////////////////////////////////////////////////////////

let adminId =

rawTeam.adminId ||

rawTeam.createdBy ||

rawTeam.contact?.id ||

members[0]?.id ||

currentUser?.id;


setTeamDetails({

...rawTeam,

adminId,

members

});


return;

}


setTeamDetails(null);

};


fetchTeamData();


},[teamId,getUserById,currentUser,location.state]);



//////////////////////////////////////////////////////////////
// ADMIN CHECK
//////////////////////////////////////////////////////////////

const isAdmin =

teamDetails && currentUser &&

String(teamDetails.adminId) === String(currentUser.id);



//////////////////////////////////////////////////////////////
// USERS AVAILABLE TO ADD
//////////////////////////////////////////////////////////////

const availableUsersForAdding = useMemo(()=>{

if(!currentUser || !teamDetails) return [];

return allUsersFromContext.filter(user =>

user.id !== currentUser.id &&

!(teamDetails.memberIds || []).includes(user.id)

);

},[allUsersFromContext,currentUser,teamDetails]);



//////////////////////////////////////////////////////////////
// LINK EXTRACTOR
//////////////////////////////////////////////////////////////

const extractLinks = (messages:DetailedMessage[])=>{

const links:{url:string,text:string,timestamp:string,senderId:string}[] = [];

const urlRegex = /(https?:\/\/[^\s"'<>`]+)/g;


messages.forEach(msg=>{

if(msg.type==='text' && typeof msg.text==='string' && msg.text.length>0){

const textContent = msg.text;

const foundUrls = textContent.match(urlRegex);

if(foundUrls){

(foundUrls as string[]).forEach(url=>{

if(!links.some(l=>l.url===url)){

links.push({

url,

text:textContent,

timestamp:msg.timestamp,

senderId:msg.senderId

});

}

});

}

}

});


return links.sort(

(a,b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()

);

};



//////////////////////////////////////////////////////////////
// TEAM MEDIA
//////////////////////////////////////////////////////////////

const teamMedia = useMemo(()=>{

if(!teamDetails || !teamDetails.messages) return [];


return teamDetails.messages

.filter(msg => msg.type==='image' || msg.type==='document')

.sort(

(a,b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()

);


},[teamDetails]);



//////////////////////////////////////////////////////////////
// TEAM LINKS
//////////////////////////////////////////////////////////////

const teamLinks = useMemo(()=>{

if(!teamDetails || !teamDetails.messages) return [];

return extractLinks(teamDetails.messages);

},[teamDetails]);



//////////////////////////////////////////////////////////////
// IMAGE CHANGE HANDLER
//////////////////////////////////////////////////////////////

const handleTeamImageChange = (

event:React.ChangeEvent<HTMLInputElement>

)=>{

const file = event.target.files?.[0];

if(file){

const reader = new FileReader();

reader.onloadend = ()=>{

setEditingTeamImagePreview(reader.result as string);

};

reader.readAsDataURL(file);

}

};



//////////////////////////////////////////////////////////////
// SAVE TEAM CHANGES
//////////////////////////////////////////////////////////////

const handleSaveChanges = ()=>{

addNotification(

"Team details updated (locally)!",

"success"

);

setIsEditModalOpen(false);

};



//////////////////////////////////////////////////////////////
// ADD MEMBERS
//////////////////////////////////////////////////////////////

const handleAddMembers = ()=>{

addNotification(

`${selectedUsersToAdd.length} member(s) added (locally).`,

"success"

);

setSelectedUsersToAdd([]);

setIsAddMemberModalOpen(false);

};



//////////////////////////////////////////////////////////////
// REMOVE MEMBER
//////////////////////////////////////////////////////////////

const confirmRemoveMember = (memberIdToRemove:string)=>{

const member = getUserById(memberIdToRemove);


if(

!member ||

!isAdmin ||

memberIdToRemove===currentUser?.id ||

memberIdToRemove===teamDetails?.adminId

){

addNotification(

"Cannot remove this member or action not permitted.",

"error"

);

return;

}


setMemberToRemove(member);

setIsConfirmRemoveModalOpen(true);

};



//////////////////////////////////////////////////////////////
// EXECUTE REMOVE
//////////////////////////////////////////////////////////////

const executeRemoveMember = ()=>{

addNotification(

`${memberToRemove?.name} removed (locally).`,

"success"

);

setIsConfirmRemoveModalOpen(false);

setMemberToRemove(null);

};



//////////////////////////////////////////////////////////////
// LOADING SCREEN
//////////////////////////////////////////////////////////////

if(!teamDetails){

return(

<div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] p-8">

<h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">

Loading Team...

</h1>

<p>If this takes too long, the team might not exist.</p>

<button

onClick={()=>navigate('/messages')}

className="mt-6 button-gradient text-white font-semibold py-2 px-4 rounded-lg"

>

Back to Messages

</button>

</div>

);

}

return (

<div className="flex flex-col flex-grow bg-[var(--background-secondary)] h-full overflow-hidden">


<header className="flex items-center justify-between p-4 bg-[var(--background-primary)] border-b border-[var(--border-primary)] shadow-sm shrink-0">


<button
onClick={()=>navigate("/messages")}
className="inline-flex items-center space-x-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 group rounded-full px-3 py-2 bg-[var(--background-tertiary)] hover:bg-[var(--component-background-hover)] border border-[var(--border-primary)]"
>

<ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1"/>

<span className="font-bold uppercase tracking-wide">

Back

</span>

</button>


{isAdmin && (

<button

onClick={()=>setIsEditModalOpen(true)}

className="flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-widest text-white button-gradient hover:opacity-90 py-2 px-3 rounded-full shadow-md transition-all"

>

<PencilIcon className="w-3.5 h-3.5"/>

<span>Edit Team</span>

</button>

)}

</header>



<main className="flex-grow overflow-y-auto p-4 sm:p-6">

<div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">


<div className="lg:col-span-2 bg-[var(--component-background)] p-6 rounded-xl border border-[var(--border-primary)] flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">


{teamDetails.contact.avatarUrl ? (

<img

src={teamDetails.contact.avatarUrl}

alt={teamDetails.contact.name}

className="w-28 h-28 rounded-full object-cover flex-shrink-0 border-4 border-[var(--background-tertiary)] shadow-lg"

/>

) : (

<div className="w-28 h-28 rounded-full icon-bg-gradient flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 border-4 border-[var(--background-tertiary)] shadow-lg">

{getInitials(teamDetails.contact.name)}

</div>

)}



<div className="flex-grow">

<h2 className="text-3xl font-bold text-[var(--text-primary)]">

{teamDetails.contact.name}

</h2>


<p className="text-sm text-[var(--text-muted)] mt-1 font-semibold">

{teamDetails.memberIds?.length || 0} Members • Created by

{" "}

{getUserById(teamDetails.adminId)?.name || "Unknown"}

</p>


{teamDetails.description && (

<p className="text-sm text-[var(--text-muted)] mt-2 font-medium">

{teamDetails.description}

</p>

)}

</div>

</div>



<div className="bg-[var(--component-background)] p-4 rounded-xl border border-[var(--border-primary)]">


<div className="flex justify-between items-center mb-3 px-2">

<h3 className="text-sm font-black uppercase tracking-widest text-[var(--text-muted)]">

Members ({(teamDetails.members || []).length})

</h3>


{isAdmin && (

<button

onClick={()=>setIsAddMemberModalOpen(true)}

className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 transition-colors py-1.5 px-3 rounded-full shadow-sm"

>

<UserPlusIcon className="w-3.5 h-3.5"/>

<span>Add</span>

</button>

)}

</div>


<ul className="space-y-2 max-h-96 overflow-y-auto custom-scrollable pr-1">

{(teamDetails.members || []).map(member => (

<li

key={member.id}

className="flex items-center justify-between p-2 rounded-xl hover:bg-[var(--component-secondary-background)] transition-colors"

>


<Link

to={`/user/${member.id}`}

className="flex items-center space-x-3 group flex-grow"

>


{member.profilePictureUrl ? (

<img

src={member.profilePictureUrl}

alt={member.name}

className="w-10 h-10 rounded-full object-cover border border-[var(--border-secondary)] group-hover:border-purple-500 transition-colors"

/>

) : (

<div className="w-10 h-10 rounded-full icon-bg-gradient flex items-center justify-center text-white font-semibold text-sm border border-[var(--border-secondary)] group-hover:border-purple-500 transition-colors">

{getInitials(member.name)}

</div>

)}


<div>

<p className="text-sm font-bold text-[var(--text-primary)]">

{member.name}

</p>


<p className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wide">

{member.id === teamDetails.adminId ? "Admin" : "Member"}

</p>

</div>

</Link>


{isAdmin && member.id !== currentUser?.id && member.id !== teamDetails.adminId && (

<button

onClick={()=>confirmRemoveMember(member.id)}

className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"

>

<UserMinusIcon className="w-4 h-4"/>

</button>

)}

</li>

))}

</ul>

</div>



<div className="bg-[var(--component-background)] rounded-xl border border-[var(--border-primary)]">


<div className="p-1 m-3 bg-[var(--background-tertiary)] rounded-full flex border border-[var(--border-primary)] shadow-sm">


<button

onClick={()=>setActiveMediaTab('media')}

className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 ${activeMediaTab==='media'?'button-gradient text-white':'text-[var(--text-muted)]'}`}

>

Media ({teamMedia.length})

</button>


<button

onClick={()=>setActiveMediaTab('links')}

className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 ${activeMediaTab==='links'?'button-gradient text-white':'text-[var(--text-muted)]'}`}

>

Links ({teamLinks.length})

</button>


</div>



<div className="p-4 pt-0 min-h-[200px]">


{activeMediaTab === 'media' && (


teamMedia.length > 0 ? (

<div className="grid grid-cols-3 sm:grid-cols-4 gap-3">

{teamMedia.map(msg => msg.file && (

<div key={msg.id} className="aspect-square bg-[var(--background-tertiary)] rounded-xl overflow-hidden shadow-sm flex items-center justify-center group relative border border-[var(--border-primary)]">


{msg.type === 'image' ? (

<a href={msg.file.url} target="_blank" rel="noopener noreferrer">

<img

src={msg.file.url}

alt={msg.file.name}

className="w-full h-full object-cover"

/>

</a>

) : (

<a

href={msg.file.url}

download={msg.file.name}

target="_blank"

rel="noopener noreferrer"

className="flex flex-col items-center justify-center text-[var(--text-muted)] hover:text-purple-500 p-2 w-full h-full"

>

<DocumentIcon className="w-8 h-8 mb-1"/>

<p className="text-[10px] font-bold text-center truncate w-full px-1">

{msg.file.name}

</p>

<ArrowDownTrayIcon className="w-3 h-3 mt-1"/>

</a>

)}

</div>

))}

</div>

) : (

<div className="text-center text-[var(--text-muted)] py-10">

<UsersIcon className="w-10 h-10 mx-auto mb-2 opacity-30"/>

<p className="text-xs font-medium">

No media shared yet.

</p>

</div>

)

)}



{activeMediaTab === 'links' && (


teamLinks.length > 0 ? (

<ul className="space-y-3">

{teamLinks.map((link,index)=>{

const sender = getUserById(link.senderId);

return(

<li

key={`${link.url}-${index}`}

className="bg-[var(--component-secondary-background)] p-3 rounded-xl"

>

<div className="flex items-center space-x-2 text-[10px] font-bold text-[var(--text-muted)] mb-1">

<span>{sender?.name}</span>

<span>•</span>

<span>

{new Date(link.timestamp).toLocaleDateString()}

</span>

</div>


<a

href={link.url}

target="_blank"

rel="noopener noreferrer"

className="text-sky-600 hover:underline text-xs font-bold truncate block"

>

{link.url}

</a>

</li>

)

})}

</ul>

) : (

<div className="text-center text-[var(--text-muted)] py-10">

<LinkIconSVG className="w-10 h-10 mx-auto mb-2 opacity-30"/>

<p className="text-xs font-medium">

No links shared yet.

</p>

</div>

)

)}

</div>

</div>

</div>

</main>

</div>

);

};