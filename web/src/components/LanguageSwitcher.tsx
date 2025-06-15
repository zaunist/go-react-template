import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage, LANGUAGES, type Language } from '../store/languageStore';

// 支持的语言列表（从状态管理中获取）
const languages = Object.entries(LANGUAGES).map(([code, config]) => ({
  code: code as Language,
  name: config.name,
  flag: config.flag,
}));

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguage();

  const handleLanguageChange = (languageCode: string) => {
    const newLanguage = languageCode as Language;
    
    // 同时更新 react-i18next 和我们的状态管理
    i18n.changeLanguage(languageCode);
    setLanguage(newLanguage);
  };

  const currentLangConfig = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLangConfig.flag}</span>
          <span className="hidden md:inline">{currentLangConfig.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${
              currentLanguage === language.code ? 'bg-accent' : ''
            }`}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;