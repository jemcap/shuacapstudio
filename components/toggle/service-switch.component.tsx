"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ServiceToggle = ({
  service,
  onActiveChange,
}: {
  service: string;
  onActiveChange: (service: string) => void;
}) => {
  return (
    <div className="flex items-center space-x-2 justify-center">
      <ToggleGroup
        type="single"
        defaultValue="videography"
        value={service}
        onValueChange={(value) => onActiveChange(value)}
        className="border rounded-lg p-1"
      >
        <ToggleGroupItem
          value="videography"
          className="text-white px-7 py-2 rounded-md data-[state=on]:bg-yellow-500 data-[state=on]:text-black"
        >
          Videography
        </ToggleGroupItem>
        <ToggleGroupItem
          value="webdev"
          className="text-white px-7 py-2 rounded-md data-[state=on]:bg-yellow-500 data-[state=on]:text-black"
        >
          Web Development
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ServiceToggle;
