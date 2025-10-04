import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const StudentProfileCompletion = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    // Personal Info
    nameEnglish: "",
    nameArabic: "",
    nationality: "",
    gender: "",
    dateOfBirth: "",
    placeOfBirth: "",
    email: "",
    phone: "",
    residenceCountry: "",
    passportNumber: "",
    passportExpiry: "",
    parentContactName: "",
    parentContactNumber: "",
    
    // Academic Info
    lastQualification: "",
    secondarySchoolName: "",
    secondaryGraduationYear: "",
    secondaryCGPA: "",
    secondaryLanguage: "",
    studiedInSaudi: "",
    qudoratPercentage: "",
    tahseeliPercentage: "",
    bachelorCountry: "",
    bachelorUniversity: "",
    bachelorGraduationYear: "",
    bachelorCGPA: "",
    bachelorCGPAOutOf: "",
    bachelorLanguage: "",
    bachelorSpecialization: "",
    masterCountry: "",
    masterUniversity: "",
    masterGraduationYear: "",
    masterCGPA: "",
    masterCGPAOutOf: "",
    masterLanguage: "",
    masterSpecialization: "",
    masterStudyMode: "",
    masterResearchTitle: "",
    
    // Ongoing/Upcoming Info
    hasStartedProgram: "",
    programCountry: "",
    programUniversity: "",
    programLanguage: "",
    programSpecialization: "",
    programTuitionFee: "",
    programStudyPeriod: "",
    programSemesters: "",
    currentSemester: "",
    currentCGPA: "",
    currentCGPAOutOf: "",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    // Basic validation would go here
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      toast({
        title: "Profile Completed",
        description: "Your profile has been submitted successfully.",
      });
      navigate("/student/scholarships");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Please complete all sections to apply for scholarships
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="mb-6">
              <Progress value={progress} className="mb-4" />
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                {[
                  { num: 1, label: "Personal Info" },
                  { num: 2, label: "Academic Info" },
                  { num: 3, label: "Program Details" },
                  { num: 4, label: "Documents" }
                ].map((step) => (
                  <div
                    key={step.num}
                    className={cn(
                      "flex flex-col items-center",
                      currentStep === step.num && "text-primary font-semibold",
                      currentStep > step.num && "text-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2",
                        currentStep === step.num && "border-primary bg-primary text-primary-foreground",
                        currentStep > step.num && "border-primary bg-primary text-primary-foreground",
                        currentStep < step.num && "border-muted"
                      )}
                    >
                      {step.num}
                    </div>
                    <span className="text-xs">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Academic Information"}
              {currentStep === 3 && "Ongoing/Upcoming Program"}
              {currentStep === 4 && "Document Uploads"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Please provide your personal details"}
              {currentStep === 2 && "Tell us about your academic background"}
              {currentStep === 3 && "Information about your current or planned studies"}
              {currentStep === 4 && "Upload required documents"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nameEnglish">Name in English (as in passport)</Label>
                  <Input
                    id="nameEnglish"
                    value={formData.nameEnglish}
                    onChange={(e) => updateFormData("nameEnglish", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameArabic">Name in Arabic</Label>
                  <Input
                    id="nameArabic"
                    value={formData.nameArabic}
                    onChange={(e) => updateFormData("nameArabic", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => updateFormData("nationality", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup value={formData.gender} onValueChange={(val) => updateFormData("gender", val)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth">Place of Birth</Label>
                  <Input
                    id="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={(e) => updateFormData("placeOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Account</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (with country code)</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residenceCountry">Residence Country</Label>
                  <Input
                    id="residenceCountry"
                    value={formData.residenceCountry}
                    onChange={(e) => updateFormData("residenceCountry", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) => updateFormData("passportNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportExpiry">Passport Expiry Date</Label>
                  <Input
                    id="passportExpiry"
                    type="date"
                    value={formData.passportExpiry}
                    onChange={(e) => updateFormData("passportExpiry", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentContactName">Parent Contact Name</Label>
                  <Input
                    id="parentContactName"
                    value={formData.parentContactName}
                    onChange={(e) => updateFormData("parentContactName", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="parentContactNumber">Parent Contact Number</Label>
                  <Input
                    id="parentContactNumber"
                    value={formData.parentContactNumber}
                    onChange={(e) => updateFormData("parentContactNumber", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="lastQualification">Last Qualification</Label>
                  <Select value={formData.lastQualification} onValueChange={(val) => updateFormData("lastQualification", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your last qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="secondary">Secondary School</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Secondary School Info (Always Required) */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Secondary School Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="secondarySchoolName">School Name</Label>
                      <Input
                        id="secondarySchoolName"
                        value={formData.secondarySchoolName}
                        onChange={(e) => updateFormData("secondarySchoolName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryGraduationYear">Year of Graduation</Label>
                      <Input
                        id="secondaryGraduationYear"
                        value={formData.secondaryGraduationYear}
                        onChange={(e) => updateFormData("secondaryGraduationYear", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryCGPA">CGPA</Label>
                      <Input
                        id="secondaryCGPA"
                        value={formData.secondaryCGPA}
                        onChange={(e) => updateFormData("secondaryCGPA", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryLanguage">Language of Study</Label>
                      <Input
                        id="secondaryLanguage"
                        value={formData.secondaryLanguage}
                        onChange={(e) => updateFormData("secondaryLanguage", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Did you study in Saudi Arabia?</Label>
                      <RadioGroup value={formData.studiedInSaudi} onValueChange={(val) => updateFormData("studiedInSaudi", val)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="saudiYes" />
                          <Label htmlFor="saudiYes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="saudiNo" />
                          <Label htmlFor="saudiNo">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {formData.studiedInSaudi === "yes" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="qudoratPercentage">Qudorat Percentage</Label>
                          <Input
                            id="qudoratPercentage"
                            value={formData.qudoratPercentage}
                            onChange={(e) => updateFormData("qudoratPercentage", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tahseeliPercentage">Tahseeli Percentage</Label>
                          <Input
                            id="tahseeliPercentage"
                            value={formData.tahseeliPercentage}
                            onChange={(e) => updateFormData("tahseeliPercentage", e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bachelor's Info (if applicable) */}
                {(formData.lastQualification === "bachelor" || formData.lastQualification === "master" || formData.lastQualification === "phd") && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-4">Bachelor's Degree Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bachelorCountry">Country of Study</Label>
                        <Input
                          id="bachelorCountry"
                          value={formData.bachelorCountry}
                          onChange={(e) => updateFormData("bachelorCountry", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bachelorUniversity">University Name</Label>
                        <Input
                          id="bachelorUniversity"
                          value={formData.bachelorUniversity}
                          onChange={(e) => updateFormData("bachelorUniversity", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bachelorGraduationYear">Year of Graduation</Label>
                        <Input
                          id="bachelorGraduationYear"
                          value={formData.bachelorGraduationYear}
                          onChange={(e) => updateFormData("bachelorGraduationYear", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bachelorCGPA">CGPA</Label>
                        <Input
                          id="bachelorCGPA"
                          value={formData.bachelorCGPA}
                          onChange={(e) => updateFormData("bachelorCGPA", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bachelorCGPAOutOf">CGPA Out Of</Label>
                        <Input
                          id="bachelorCGPAOutOf"
                          value={formData.bachelorCGPAOutOf}
                          onChange={(e) => updateFormData("bachelorCGPAOutOf", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bachelorLanguage">Studying Language</Label>
                        <Input
                          id="bachelorLanguage"
                          value={formData.bachelorLanguage}
                          onChange={(e) => updateFormData("bachelorLanguage", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bachelorSpecialization">Specialization</Label>
                        <Input
                          id="bachelorSpecialization"
                          value={formData.bachelorSpecialization}
                          onChange={(e) => updateFormData("bachelorSpecialization", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Master's Info (if applicable) */}
                {(formData.lastQualification === "master" || formData.lastQualification === "phd") && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-4">Master's Degree Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="masterCountry">Country of Study</Label>
                        <Input
                          id="masterCountry"
                          value={formData.masterCountry}
                          onChange={(e) => updateFormData("masterCountry", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="masterUniversity">University Name</Label>
                        <Input
                          id="masterUniversity"
                          value={formData.masterUniversity}
                          onChange={(e) => updateFormData("masterUniversity", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="masterGraduationYear">Year of Graduation</Label>
                        <Input
                          id="masterGraduationYear"
                          value={formData.masterGraduationYear}
                          onChange={(e) => updateFormData("masterGraduationYear", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="masterCGPA">CGPA</Label>
                        <Input
                          id="masterCGPA"
                          value={formData.masterCGPA}
                          onChange={(e) => updateFormData("masterCGPA", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="masterCGPAOutOf">CGPA Out Of</Label>
                        <Input
                          id="masterCGPAOutOf"
                          value={formData.masterCGPAOutOf}
                          onChange={(e) => updateFormData("masterCGPAOutOf", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="masterLanguage">Studying Language</Label>
                        <Input
                          id="masterLanguage"
                          value={formData.masterLanguage}
                          onChange={(e) => updateFormData("masterLanguage", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="masterSpecialization">Specialization</Label>
                        <Input
                          id="masterSpecialization"
                          value={formData.masterSpecialization}
                          onChange={(e) => updateFormData("masterSpecialization", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="masterStudyMode">Study Mode</Label>
                        <Select value={formData.masterStudyMode} onValueChange={(val) => updateFormData("masterStudyMode", val)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select study mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="thesis">Thesis</SelectItem>
                            <SelectItem value="coursework">Coursework</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="masterResearchTitle">Research Title</Label>
                        <Input
                          id="masterResearchTitle"
                          value={formData.masterResearchTitle}
                          onChange={(e) => updateFormData("masterResearchTitle", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Ongoing/Upcoming Program */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Have you started the program?</Label>
                  <RadioGroup value={formData.hasStartedProgram} onValueChange={(val) => updateFormData("hasStartedProgram", val)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="startedYes" />
                      <Label htmlFor="startedYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="startedNo" />
                      <Label htmlFor="startedNo">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="programCountry">Country of Study</Label>
                    <Input
                      id="programCountry"
                      value={formData.programCountry}
                      onChange={(e) => updateFormData("programCountry", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="programUniversity">University Name</Label>
                    <Input
                      id="programUniversity"
                      value={formData.programUniversity}
                      onChange={(e) => updateFormData("programUniversity", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="programLanguage">Studying Language</Label>
                    <Input
                      id="programLanguage"
                      value={formData.programLanguage}
                      onChange={(e) => updateFormData("programLanguage", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="programSpecialization">Specialization</Label>
                    <Input
                      id="programSpecialization"
                      value={formData.programSpecialization}
                      onChange={(e) => updateFormData("programSpecialization", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="programTuitionFee">Yearly Tuition Fee</Label>
                    <Input
                      id="programTuitionFee"
                      value={formData.programTuitionFee}
                      onChange={(e) => updateFormData("programTuitionFee", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="programStudyPeriod">Study Period (years)</Label>
                    <Input
                      id="programStudyPeriod"
                      value={formData.programStudyPeriod}
                      onChange={(e) => updateFormData("programStudyPeriod", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="programSemesters">Number of Semesters</Label>
                    <Input
                      id="programSemesters"
                      value={formData.programSemesters}
                      onChange={(e) => updateFormData("programSemesters", e.target.value)}
                    />
                  </div>
                </div>

                {formData.hasStartedProgram === "yes" && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-4">Current Study Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentSemester">Current Semester Number</Label>
                        <Input
                          id="currentSemester"
                          value={formData.currentSemester}
                          onChange={(e) => updateFormData("currentSemester", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentCGPA">CGPA</Label>
                        <Input
                          id="currentCGPA"
                          value={formData.currentCGPA}
                          onChange={(e) => updateFormData("currentCGPA", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentCGPAOutOf">CGPA Out Of</Label>
                        <Input
                          id="currentCGPAOutOf"
                          value={formData.currentCGPAOutOf}
                          onChange={(e) => updateFormData("currentCGPAOutOf", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Document Uploads */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="passportDoc">Passport Copy</Label>
                  <Input id="passportDoc" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personalImage">Personal Image</Label>
                  <Input id="personalImage" type="file" accept="image/*" />
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Academic Documents</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Secondary School Certificate</Label>
                      <Input type="file" />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary School Transcript</Label>
                      <Input type="file" />
                    </div>
                    {formData.studiedInSaudi === "yes" && (
                      <>
                        <div className="space-y-2">
                          <Label>Qudorat Certificate</Label>
                          <Input type="file" />
                        </div>
                        <div className="space-y-2">
                          <Label>Tahseeli Certificate</Label>
                          <Input type="file" />
                        </div>
                      </>
                    )}
                    {(formData.lastQualification === "bachelor" || formData.lastQualification === "master" || formData.lastQualification === "phd") && (
                      <>
                        <div className="space-y-2">
                          <Label>Bachelor's Degree Certificate</Label>
                          <Input type="file" />
                        </div>
                        <div className="space-y-2">
                          <Label>Bachelor's Transcript</Label>
                          <Input type="file" />
                        </div>
                      </>
                    )}
                    {(formData.lastQualification === "master" || formData.lastQualification === "phd") && (
                      <>
                        <div className="space-y-2">
                          <Label>Master's Degree Certificate</Label>
                          <Input type="file" />
                        </div>
                        <div className="space-y-2">
                          <Label>Master's Transcript</Label>
                          <Input type="file" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Additional Documents</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Volunteering Certificates (if any)</Label>
                      <Input type="file" multiple />
                    </div>
                    <div className="space-y-2">
                      <Label>Language Certificate</Label>
                      <Input type="file" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button onClick={handleNext}>
                {currentStep === totalSteps ? "Submit" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentProfileCompletion;
