interface LanguagesSectionProps {
    languages: string[];
  }
  
  export const LanguagesSection = ({ languages }: LanguagesSectionProps) => (
    <div className="space-y-4 pt-5">
      <h3 className="text-base font-semibold mb-2">Languages That I Speak</h3>
      <div className="flex flex-wrap gap-2">
        {languages.map((language: string) => (
          <span 
            key={language} 
            className="text-xs px-2 py-1 dark:border dark:bg-transparent bg-gray-100 rounded-md"
          >
            {language}
          </span>
        ))}
      </div>
    </div>
  );