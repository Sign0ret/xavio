import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UploadPDF from "./upload_pdf"
import { DropDown } from './dropdown';
import { UploadLink } from './upload_link';



export function ModalPupUp() {
  /* const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };  */

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-16 py-2 rounded-md bg-purple-600 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-purple-600" variant="outline">CV o Link a redes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Documents</DialogTitle>
          <DialogDescription>
            Make changes to your professional documents. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <UploadPDF/>
        {/* dropdown */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={selectedOption ? selectedOption : ""} onValueChange={setSelectedOption}>
              <DropdownMenuRadioItem value="pdf">Subir pdf</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="link">Subir link</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* <DropDown onOptionSelect={handleOptionSelect} /> */}
        <div className="">
          <div className="">
            <Label htmlFor="name" className="">
              Card Title
            </Label>
            <Input
              id="name"
              className=""
              placeholder='Type the card name'
            />
          </div>
        </div>
        {/* <div className="mt-4">
          {selectedOption === 'link' && <UploadLink/>}
          {selectedOption === 'pdf' && <UploadPDF/>}
        </div> */}
        <DialogFooter className="">
          <Button className="" type="submit">UpLoad</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
