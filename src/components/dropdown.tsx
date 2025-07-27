import { BuilderComponent } from './builder-provider';
import React, { useState } from 'react';

interface HoneyDropdownProps {
  title: string;
  title_text: string
  children: React.ReactNode;
}

export default function Dropdown({ title, title_text, children }: HoneyDropdownProps) {
  const [open, setOpen] = useState(title == "Honey" ? true : false);

  return (
    <div className="w-full bg-[#fbf7ec] p-0 m-0 py-4">
      <div className="mx-auto flex justify-center w-[350px]">
        <div className="text-left">
          <div className="flex items-center gap-2 justify-between">
            {/*
            <div
              className="flex items-center justify-between rounded-xl bg-[#ffc652] px-4 py-3 cursor-pointer select-none w-fit"
              style={{ fontFamily: 'var(--font-moretmnk)', fontWeight: 400 }}
              onClick={() => setOpen((o) => !o)}
            >
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-xl text-[#23201C]">{title}</span>
              </div>
            </div>
            */}
            <BuilderComponent 
          model="figma-imports"
          entry="ea29e2bded30427890846e6fe0bf98f8"
          data={{
              title: title,
              title_text: title_text,
            }}
        />
            <svg
              className={`transition-transform duration-300 cursor-pointer ${open ? '' : 'rotate-180'}`}
              width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
              onClick={() => setOpen((o) => !o)}
            >
              <path d="M14 28l10-10 10 10" stroke="#23201C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${open ? 'opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="pb-4 pt-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
