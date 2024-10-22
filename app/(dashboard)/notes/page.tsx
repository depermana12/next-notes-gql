import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddNoteDialog } from "@/components/dash-addnote";

const page = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <AddNoteDialog />
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Test title</CardTitle>
              <CardDescription>This is date</CardDescription>
            </CardHeader>
            <CardContent>This is the content of note</CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default page;
