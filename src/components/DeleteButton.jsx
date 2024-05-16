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
} from "@/components/ui/alert-dialog"
import propTypes from 'prop-types'
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export function DeleteButton({ handleDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="w-10 h-10 p-0">                 
          <Trash size={20}></Trash>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
DeleteButton.propTypes = {
  handleDelete: propTypes.func.isRequired,
}

