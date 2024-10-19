import * as React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useEffect } from "react";
import instance from "@/axiosInstance";
import { useState } from "react";
const OptionsModal = ({ isOpen = false, onChangeOptionsModal, id }) => {
  const { data: session } = useSession();
  const [isReported, setIsReported] = useState();
  async function handleReportSubmit(e) {
    e.preventDefault();
    const response = await instance.post("/api/user/reportPost", {
      postId: id,
      victimUser: session.id,
    });
    setIsReported(true);

    if (response) {
      toast.success("Post has been reported");
      onChangeOptionsModal()
      //   setIsOpen(false);
    //   notify();
    }
  }

  const handleAlreadyReported = useCallback(async () => {
    if (session) {
      const response = await instance.post("/api/user/post-already-reported", {
        postId: id,
        victimUser: session?.id,
      });
      console.log(response);
      setIsReported(response.data.alreadyReported);
    }
  }, [id, session]);

  useEffect(() => {
    handleAlreadyReported();
  }, [handleAlreadyReported]);
  return (
    <Dialog open={isOpen} onOpenChange={onChangeOptionsModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black text-left">Options</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-0">
          {/* {options.map((option, index) => ( */}
          {/* <React.Fragment key={option}> */}
          {!isReported ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Report Post</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReportSubmit}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <div>Already Reported</div>
          )}
          {/* {index < options.length - 1 && <Separator />} */}
          {/* </React.Fragment> */}
          {/* ))} */}
          <Separator />
          <Button
            variant="ghost"
            className="w-full justify-start font-normal hover:bg-accent hover:text-accent-foreground"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OptionsModal;
