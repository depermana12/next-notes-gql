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

interface Note {
  title: string;
  content: string;
  createdAt: string;
}

const NoteCard = ({ note }: { note: Note }) => {
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
                <MenubarItem>Edit</MenubarItem>
                <MenubarItem>Delete</MenubarItem>
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
