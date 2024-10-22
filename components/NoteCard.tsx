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
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>{note.content}</CardContent>
      <CardFooter>{note.createdAt}</CardFooter>
    </Card>
  );
};
export default NoteCard;
