import { useState } from "react";
import Button from "../ui/button/Button";
import { InputMath } from "../InputMath";

interface PostCardProps {
  id: number;
  author: {
    username: string;
  }
  avatar: string;
  title: string;
  createdAt: string;
  starting_numb: number;
}

export function PostCard({ author, avatar, title, createdAt, starting_numb }: PostCardProps) {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState(0);
    return (
        <div className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div className="min-w-0">
                    <div className="flex items-center space-x-1">
                    <span className="font-bold text-gray-900 truncate">{author.username}</span>
                    </div>
                </div>
                </div>
                <span className="text-blue-400 hover:text-blue-600 transition-colors">
                Ellty
                </span>
            </div>

            <div className="mb-3">
                <p className="text-gray-900 text-sm whitespace-pre-wrap leading-relaxed">
                {title +  ' - ' +  starting_numb}
                </p>
            </div>

            <div className="text-gray-500 text-xs mb-5">{createdAt}</div>
            <div className="border-t border-[0.7px] border-[#CDCDCD] mb-3"></div>
            <div className="flex items-start gap-2 w-full">
                <Button
                    children="Reply"
                    bgColor="bg-warning-25"
                    size="sm"
                    onClick={() => setOpen(!open)}
                />

                {open && (
                    <div className="flex-1">
                        <InputMath value={text} height="h-20" onChange={(e: any) => setText(e.target.value)}
                        className="w-full" />
                    </div>
                )}
            </div>
        </div>
    );
}