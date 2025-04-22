import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ServiceToggle = () => {
  return (
    <div className="flex items-center space-x-2 h-56 justify-center">
      <Switch id="service-switch" />
      <Label htmlFor="service-switch" className="text-xl">
        Website services
      </Label>
    </div>
  );
};

export default ServiceToggle;
