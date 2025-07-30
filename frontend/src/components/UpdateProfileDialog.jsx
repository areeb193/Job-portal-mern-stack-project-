import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { setUser } from '../redux/authSlice'


const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        bio: '',
        skills: '',
        file: ''
    });

    useEffect(() => {
        if (open) {
            console.log('Dialog opened. User data:', user);
            console.log('User profile:', user?.profile); 
            
            // Use actual user data or test data for demonstration
            const userData = user || {
                fullname: 'John Doe',
                email: 'john@example.com',
                phoneNumber: '123-456-7890',
                profile: {
                    bio: 'I am a passionate developer with experience in React and Node.js',
                    skills: ['JavaScript', 'React', 'Node.js', 'CSS']
                }
            };
            
            setInput({
                fullname: userData?.fullname || '',
                email: userData?.email || '',
                phoneNumber: userData?.phoneNumber || '',
                bio: userData?.profile?.bio || '',
                skills: userData?.profile?.skills ? (Array.isArray(userData.profile.skills) ? userData.profile.skills.join(', ') : userData.profile.skills) : '',
                file: ''
            });
        }
    }, [user, open]);

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        // Convert skills string to array format for backend
        const skillsArray = input.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        formData.append("skills", JSON.stringify(skillsArray));
        if (input.file) {
            formData.append("file", input.file);
        }
        
        try {
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                // Update Redux store with new user data
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || 'Profile updated successfully!');
                setOpen(false);
            }
        } catch (error) {
            console.error('Profile update failed:', error);
            toast.error(error.response?.data?.message || 'Profile update failed');
        } finally {
            setLoading(false);
        }
        console.log('Form data sent:', {
            fullname: input.fullname,
            email: input.email,
            phoneNumber: input.phoneNumber,
            bio: input.bio,
            skills: skillsArray
        });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({
            ...input,
            file: file
        });
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">
                            Bio
                        </Label>
                        <Input
                            id="bio"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Skills" className="text-right">
                            Skills
                        </Label>
                        <Input
                            id="Skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">
                            Resume
                        </Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                            onChange={fileChangeHandler}
                            accept="application/pdf"
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        {
                            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait </Button> : <button type='submit' className='w-full my-4 bg-black text-amber-50'>update</button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog