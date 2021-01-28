Color Utilities are enabled through [Tailwindcss](/tailwindcss). The background, text, and border color can be set for the static, hover, and responsive states of any element using the proper prefix below.

    /* Background Color */
    .bg-{{ color }}

    /* Text Color */
    .text-{{ color }}

    /* Border Color */
    .border-{{ color }}

    /* Hover State (for the background property) */
    .hover:bg-{{ color }}

    /* Responsive State (for the background property) */
    .{{ variant }}:bg-{{ color }}

More details about the configuration can be found in the [Tailwindcss Utilities](/tailwindcss) documentation.
