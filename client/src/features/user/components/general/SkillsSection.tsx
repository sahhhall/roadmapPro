interface SkillsSectionProps {
    skills: string[];
  }
  
  export const SkillsSection = ({ skills }: SkillsSectionProps) => (
    <div className="w-full mt-4 shadow-sm dark:border-gray-800 bg-white border border-gray-100 dark:bg-black rounded-lg">
      <div className="p-3 flex-wrap items-center space-x-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 dark:bg-transparent dark:border bg-blue-50 text-blue-700 rounded-md text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );