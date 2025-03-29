"use client";
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
} from "date-fns";
import { useState } from "react";

function getDaysInMonth(date: Date) {
  const days = [];
  const monthStart = startOfMonth(date);
  let start = startOfWeek(monthStart);
  const monthEnd = endOfMonth(date);
  const end = endOfWeek(monthEnd);

  while (start <= end) {
    days.push({
      date: `${start.getFullYear()}-${start.getMonth() + 1}-${start
        .getDate()
        .toString()
        .padStart(2, "0")}`,
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
    });
    start = add(start, { days: 1 });
  }
  return days;
}

interface DatePickerProps {
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
}

export function DatePicker({}: DatePickerProps) {
  const [viewDay, setViewDay] = useState(new Date());
  const days = getDaysInMonth(viewDay);
  function goForwardMonth() {
    setViewDay(add(viewDay, { months: 1 }));
  }

  function goBackwardMonth() {
    setViewDay(add(viewDay, { months: -1 }));
  }

  console.log(days);
  return (
    <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
      <div className="flex items-center text-gray-900">
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
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
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
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
        {days.map((day, dayIdx) => (
          <button
            key={day.date}
            type="button"
            className={clsx(
              "py-1.5 hover:bg-gray-100 focus:z-10",
              day.isCurrentMonth ? "bg-white" : "bg-gray-50",
              (day.isSelected || day.isToday) && "font-semibold",
              day.isSelected && "text-white",
              !day.isSelected &&
                day.isCurrentMonth &&
                !day.isToday &&
                "text-gray-900",
              !day.isSelected &&
                !day.isCurrentMonth &&
                !day.isToday &&
                "text-gray-400",
              day.isToday && !day.isSelected && "text-indigo-600",
              dayIdx === 0 && "rounded-tl-lg",
              dayIdx === 6 && "rounded-tr-lg",
              dayIdx === days.length - 7 && "rounded-bl-lg",
              dayIdx === days.length - 1 && "rounded-br-lg"
            )}
          >
            <time
              dateTime={day.date}
              className={clsx(
                "mx-auto flex size-7 items-center justify-center rounded-full",
                day.isSelected && day.isToday && "bg-indigo-600",
                day.isSelected && !day.isToday && "bg-gray-900"
              )}
            >
              {format(day.date, "d")}
            </time>
          </button>
        ))}
      </div>
    </div>
  );
}
