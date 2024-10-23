import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { EllipsisVertical } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDeleteNote: (noteId: number) => void;
}

const NoteCard = ({ note, onEdit, onDeleteNote }: NoteCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{note.title}</CardTitle>
          <Menubar className="border-none mx-0">
            <MenubarMenu>
              <MenubarTrigger>
                <EllipsisVertical size={20} />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => onEdit(note)}>Edit</MenubarItem>
                <MenubarItem onClick={() => onDeleteNote(note.id)}>
                  Delete
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </CardHeader>
      <CardContent>{note.content}</CardContent>
      <CardFooter className="text-xs">
        {new Date(Number(note.createdAt)).toLocaleString()}
      </CardFooter>
    </Card>
  );
};
export default NoteCard;
