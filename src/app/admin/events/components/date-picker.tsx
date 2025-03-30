"use client";
import { TZDate } from "@date-fns/tz";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import { useState } from "react";
import clsx from "clsx";
import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  add,
  format,
  isSameDay,
} from "date-fns";
import { useState } from "react";

function getDaysInMonth(date: Date) {
  const days = [];
  const tzDate = new TZDate(date, "America/Chicago");
  const monthStart = startOfMonth(tzDate);
  let start = startOfWeek(monthStart);
  const monthEnd = endOfMonth(tzDate);
  const end = endOfWeek(monthEnd);

  while (start <= end) {
    days.push({
      date: start,
      isCurrentMonth: true,
      isToday: isSameDay(start, new Date()),
    });
    start = add(start, { days: 1 });
  }
  return days;
}

interface DatePickerProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function DatePicker({ selectedDate, onSelectDate }: DatePickerProps) {
  const [viewDay, setViewDay] = useState(new Date());
  const days = getDaysInMonth(viewDay);
  function goForwardMonth() {
    setViewDay(add(viewDay, { months: 1 }));
  }

  function goBackwardMonth() {
    setViewDay(add(viewDay, { months: -1 }));
  }

  return (
    <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
      <div className="flex items-center text-gray-900">
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 cursor-pointer"
          onClick={goBackwardMonth}
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="size-5" aria-hidden="true" />
        </button>
        <div className="flex-auto text-sm font-semibold">
          {format(viewDay, "MMMM")}
        </div>
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 cursor-pointer"
          onClick={goForwardMonth}
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-xs/6 text-gray-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm ring-1 shadow-sm ring-gray-200">
        {days.map((day, dayIdx) => {
          const isSelected = new Date(selectedDate)
            ? isSameDay(selectedDate, day.date)
            : false;
          return (
            <button
              key={day.date.toISOString()}
              type="button"
              onClick={() => onSelectDate(day.date)}
              className={clsx(
                "py-1.5 hover:bg-gray-100 focus:z-10",
                day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                (isSelected || day.isToday) && "font-semibold",
                isSelected && "text-white",
                !isSelected &&
                  day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-900",
                !isSelected &&
                  !day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-400",
                day.isToday && !isSelected && "text-indigo-600",
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 6 && "rounded-tr-lg",
                dayIdx === days.length - 7 && "rounded-bl-lg",
                dayIdx === days.length - 1 && "rounded-br-lg"
              )}
            >
              <time
                dateTime={day.date.toISOString()}
                className={clsx(
                  "mx-auto flex size-7 items-center justify-center rounded-full",
                  isSelected && day.isToday && "bg-indigo-600",
                  isSelected && !day.isToday && "bg-gray-900"
                )}
              >
                {format(day.date, "d")}
              </time>
            </button>
          );
        })}
      </div>
    </div>
  );
}
