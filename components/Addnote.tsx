"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
}

interface AddNoteInput {
  id?: number;
  title: string;
  content: string;
}
interface AddNoteDialogProps {
  dialogState: { isOpen: boolean; noteToEdit: Note | null };
  onAddNote: (note: AddNoteInput) => void;
  onEditNote: (note: AddNoteInput) => void;
  onClose: () => void;
  onAddDialog: () => void;
}

export function AddNoteDialog({
  dialogState,
  onAddNote,
  onEditNote,
  onClose,
  onAddDialog,
}: AddNoteDialogProps) {
  const [title, setTitle] = useState(dialogState.noteToEdit?.title || "");
  const [content, setContent] = useState(dialogState.noteToEdit?.content || "");

  const handleSubmit = () => {
    const noteData = { title, content };

    if (dialogState.noteToEdit) {
      onEditNote({ ...noteData });
    } else {
      onAddNote(noteData);
    }
    setTitle("");
    setContent("");
    onClose();
  };

  useEffect(() => {
    if (dialogState.noteToEdit) {
      setTitle(dialogState.noteToEdit.title);
      setContent(dialogState.noteToEdit.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [dialogState.noteToEdit]);

  return (
    <Dialog open={dialogState.isOpen} onOpenChange={onClose}>
      <Button onClick={onAddDialog}>
        <CirclePlus /> Add new note
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {dialogState.noteToEdit ? "Edit your note" : "Add a new note"}
          </DialogTitle>
          <DialogDescription>
            {dialogState.noteToEdit
              ? "Modify your note below. Click save when you're done."
              : "Write your note below. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            {dialogState.noteToEdit ? "Save Changes" : "Save Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
