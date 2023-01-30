//create a componet button

import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <button
      className="h-12 rounded-md bg-purple-400 px-8 w-full delay-150 hover:bg-indigo-500 duration-300"
      {...props}
    />
  );
}
