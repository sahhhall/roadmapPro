import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { companyOptions } from "@/features/shared/constants/companiesOptions";
import { languages } from "@/features/shared/constants/languageOptions";

const FiltersPanel = ({ onFilterChange }: { onFilterChange: any }) => {
  const companies = companyOptions;
  const langs = languages;
  //for selected companies usr will seclect companies
  //and we have to filter selected and unselescted
  //and it sent to mentorlisting component
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [expirience, setExpirience] = useState([0]);

  const handleCompanySelect = (value: string) => {
    setSelectedCompanies((prev) => {
      //look for selected company already there if there just remove and if not thre spread
      const newCompanies = prev.includes(value)
        ? prev.filter((company) => company !== value)
        : [...prev, value];
      const queryString = newCompanies.join(",");
      onFilterChange({ companies: queryString, expirience: expirience[0] });
      return newCompanies;
    });
  };

  const handleExpirienceChange = (value: number[]) => {
    setExpirience(value);
    onFilterChange({ expirience: value[0] });
  };

  //when new langugage select this will trigger
  const handleLanguageSelect = (value: string) => {
    setSelectedLanguages((prev) => {
      const newLanguages = prev.includes(value)
        ? prev.filter((lang) => lang !== value)
        : [...prev, value];
      onFilterChange({
        companies: selectedCompanies.join(","),
        expirience: expirience[0],
        languages: newLanguages,
      });

      return newLanguages;
    });
  };

  const handleReset = () => {
    setSelectedCompanies([]);
    setSelectedLanguages([]);
    setExpirience([0]);
    onFilterChange({
      companies: "",
      expirience: 0,
      languages: [],
      search: "",
    });
  };

  const hasActiveFilters =
    selectedCompanies.length > 0 ||
    selectedLanguages.length > 0 ||
    expirience[0] > 0;

  return (
    <div className="space-y-6 p-4">
      <div className="flex ">
        <div className="flex w-full items-center justify-between">
          <div className="text-lg font-semibold">Filter By</div>
          <div>
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="text-xs font-normal gap-2 items-center flex border border-red-500 px-3 p-1 rounded-2xl "
              >
                <X className="w-3 h-3  text-red-600" /> Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
      {/* for company  */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Companies</h4>
          <Select onValueChange={handleCompanySelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="px-2 py-1.5">Companies</SelectLabel>
                {companies.map((company) => (
                  <SelectItem key={company.value} value={company.value}>
                    <div className="flex items-center gap-2">
                      <img
                        className="w-4 h-4 object-contain"
                        src={company.logo}
                        alt={company.value}
                      />
                      <span>{company.value}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {selectedCompanies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCompanies.map((company) => (
              <span key={company} className="flex text-xs items-center gap-1">
                <img
                  className="w-3 h-3 object-contain"
                  src={companies.find((c) => c.value === company)?.logo}
                  alt={company}
                />
                {company}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleCompanySelect(company)}
                />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* for expiriece  */}
      <div>
        <div>
          <h4 className="text-sm font-medium mb-4">Experience (years)</h4>
        </div>
        <Slider
          value={expirience}
          onValueChange={handleExpirienceChange}
          max={20}
          step={1}
        />
        <div className="mt-2 text-sm text-gray-500">
          {expirience[0]}+ years of experience
        </div>
      </div>

      {/* languages select */}
      <div>
        <h4 className="text-sm font-medium mb-2">Languages</h4>
        <div className="flex flex-wrap gap-2">
          {langs.map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleLanguageSelect(lang.value)}
              className={`px-3 py-1 transition-colors rounded-md text-xs  duration-200 ${
                selectedLanguages.includes(lang.value)
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              }`}
            >
              {lang.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
