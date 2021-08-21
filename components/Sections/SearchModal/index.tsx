import { useHotkeys } from 'react-hotkeys-hook';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  open: boolean;
  setOpen: any;
  search: string;
  setSearchValue: any;
}

const variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0,
    },
  },
};

const SearchModal = ({ open, search, setSearchValue, setOpen }: Props) => {
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  useHotkeys(
    'escape',
    () => {
      setSearchValue(''), setOpen(false);
    },
    {
      filterPreventDefault: true,
      enableOnTags: ['INPUT'],
    }
  );
  return (
    <div className="w-full">
      {!open && (
        <div
          className="w-full border border-gray-400 text-gray-400 rounded-md px-4 py-3 text-base flex gap-2 items-center justify-between cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="hidden md:block">Search</span>
          <span className="border border-gray-400 px-2 py-1 rounded-md">ctrl + y</span>
        </div>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className="relative w-full mb-4"
          >
            <input
              aria-label={search}
              type="text"
              onChange={onChange}
              placeholder={search}
              className="outline-none px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-red-500 focus:border-gray-400 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchModal;
