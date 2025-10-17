import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ScholarshipApplicationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scholarshipName: string;
};

// Mock data
const mockCountries = ["United States", "United Kingdom", "Canada", "Germany", "Australia"];
const mockUniversitiesByCountry: Record<string, string[]> = {
  "United States": ["Harvard University", "MIT", "Stanford University"],
  "United Kingdom": ["Oxford University", "Cambridge University", "Imperial College"],
  "Canada": ["University of Toronto", "McGill University", "UBC"],
  "Germany": ["TU Munich", "Heidelberg University", "Humboldt University"],
  "Australia": ["University of Melbourne", "ANU", "University of Sydney"]
};

const programLevels = ["Bachelor", "Master", "PhD"];

export const ScholarshipApplicationDialog = ({ open, onOpenChange, scholarshipName }: ScholarshipApplicationDialogProps) => {
  const { toast } = useToast();
  const [hasStarted, setHasStarted] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [offerLetterFile, setOfferLetterFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    specializationName: "",
    programLevel: "",
    cgpa: "",
    cgpaOutOf: "",
    totalSemesters: "",
    currentSemester: "",
    yearlyTuitionFees: ""
  });

  const resetForm = () => {
    setHasStarted("");
    setSelectedCountry("");
    setSelectedUniversity("");
    setOfferLetterFile(null);
    setFormData({
      specializationName: "",
      programLevel: "",
      cgpa: "",
      cgpaOutOf: "",
      totalSemesters: "",
      currentSemester: "",
      yearlyTuitionFees: ""
    });
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOfferLetterFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!hasStarted) {
      toast({
        title: "Missing Information",
        description: "Please select if you have started your program.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedCountry) {
      toast({
        title: "Missing Information",
        description: "Please select your country.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedUniversity) {
      toast({
        title: "Missing Information",
        description: "Please select your university.",
        variant: "destructive"
      });
      return;
    }

    if (hasStarted === "yes") {
      if (!formData.specializationName || !formData.programLevel || !formData.cgpa || 
          !formData.cgpaOutOf || !formData.totalSemesters || !formData.currentSemester || 
          !formData.yearlyTuitionFees || !offerLetterFile) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields and upload your offer letter.",
          variant: "destructive"
        });
        return;
      }
    } else {
      if (!formData.specializationName) {
        toast({
          title: "Missing Information",
          description: "Please enter the specialization name.",
          variant: "destructive"
        });
        return;
      }
    }

    toast({
      title: "Application Submitted!",
      description: `Your application for ${scholarshipName} has been submitted successfully.`
    });
    handleClose();
  };

  const availableUniversities = selectedCountry ? mockUniversitiesByCountry[selectedCountry] || [] : [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {scholarshipName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Has Started or Not */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Have you started your program?</Label>
            <RadioGroup value={hasStarted} onValueChange={setHasStarted}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="started-yes" />
                <Label htmlFor="started-yes" className="font-normal cursor-pointer">
                  Yes, I have already started
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="started-no" />
                <Label htmlFor="started-no" className="font-normal cursor-pointer">
                  No, I have not started yet
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Select Country - shown after hasStarted is selected */}
          {hasStarted && (
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">
                  {hasStarted === "yes" ? "Current Country of Study" : "Select Country"}
                </Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  If you cannot find your country in the list, you are not eligible for this scholarship.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Select University - shown after country is selected */}
          {hasStarted && selectedCountry && (
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">
                  {hasStarted === "yes" ? "Current University" : "Select University"}
                </Label>
                <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a university" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUniversities.map((university) => (
                      <SelectItem key={university} value={university}>
                        {university}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  If you cannot find your university in the list, you are not eligible for this scholarship.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Program Details - shown after university is selected */}
          {hasStarted && selectedCountry && selectedUniversity && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold">
                {hasStarted === "yes" ? "Current Program Details" : "Intended Program Details"}
              </h3>

              <div>
                <Label>Specialization Name *</Label>
                <Input
                  placeholder="e.g., Computer Science"
                  value={formData.specializationName}
                  onChange={(e) => setFormData({ ...formData, specializationName: e.target.value })}
                  className="mt-2"
                />
              </div>

              {hasStarted === "yes" && (
                <>
                  <div>
                    <Label>Program Level *</Label>
                    <Select 
                      value={formData.programLevel} 
                      onValueChange={(value) => setFormData({ ...formData, programLevel: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {programLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>CGPA *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g., 3.75"
                        value={formData.cgpa}
                        onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>CGPA Out Of *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g., 4.0"
                        value={formData.cgpaOutOf}
                        onChange={(e) => setFormData({ ...formData, cgpaOutOf: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Total Semesters *</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 8"
                        value={formData.totalSemesters}
                        onChange={(e) => setFormData({ ...formData, totalSemesters: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Current Semester Number *</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 5"
                        value={formData.currentSemester}
                        onChange={(e) => setFormData({ ...formData, currentSemester: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Yearly Tuition Fees *</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 25000"
                      value={formData.yearlyTuitionFees}
                      onChange={(e) => setFormData({ ...formData, yearlyTuitionFees: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Offer Letter Document *</Label>
                    <div className="mt-2">
                      <label className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <Upload className="h-5 w-5" />
                        <span className="text-sm">
                          {offerLetterFile ? offerLetterFile.name : "Click to upload offer letter (PDF, JPG, PNG)"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
