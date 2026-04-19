import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ServerUrl = import.meta.env.VITE_SERVER_URL || "";
const ApiBase = ServerUrl.endsWith("/") ? ServerUrl : `${ServerUrl}/`;

const monthFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "long",
  year: "numeric",
});

const dayFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getTourDate(tour) {
  const tourDate = new Date(tour?.tourDate);
  return Number.isNaN(tourDate.getTime()) ? null : tourDate;
}

function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

function buildCalendarDays(activeMonth) {
  const year = activeMonth.getFullYear();
  const month = activeMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const leadingEmptyDays = firstDay.getDay();

  return [
    ...Array.from({ length: leadingEmptyDays }, (_, index) => ({
      key: `empty-${index}`,
      day: "",
      dateKey: null,
    })),
    ...Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(year, month, index + 1);

      return {
        key: getDateKey(date),
        day: index + 1,
        dateKey: getDateKey(date),
      };
    }),
  ];
}

const ManageTours = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTours, setShowTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMonth, setActiveMonth] = useState(() => new Date());

  useEffect(() => {
    let isMounted = true;

    async function getTours() {
      setIsLoading(true);

      try {
        const res = await axios.get(`${ApiBase}admin/tour/getTours`, {
          withCredentials: true,
        });

        if (!isMounted) return;
        setShowTours(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("error while getting tours", err);
        if (isMounted) {
          setShowTours([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    getTours();

    return () => {
      isMounted = false;
    };
  }, [showForm]);

  const sortedTours = useMemo(() => {
    return [...showTours].sort((a, b) => {
      const firstDate = getTourDate(a)?.getTime() || 0;
      const secondDate = getTourDate(b)?.getTime() || 0;

      return firstDate - secondDate;
    });
  }, [showTours]);

  const calendarEvents = useMemo(() => {
    return sortedTours.reduce((events, tour) => {
      const tourDate = getTourDate(tour);
      if (!tourDate) return events;

      const dateKey = getDateKey(tourDate);
      events[dateKey] = [...(events[dateKey] || []), tour];

      return events;
    }, {});
  }, [sortedTours]);

  const upcomingTours = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return sortedTours.filter((tour) => {
      const tourDate = getTourDate(tour);
      return tourDate && tourDate >= today;
    });
  }, [sortedTours]);

  const nextTour = upcomingTours[0];
  const availableCount = sortedTours.filter((tour) => tour.availability).length;

  function changeMonth(step) {
    setActiveMonth(
      (currentMonth) =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + step, 1),
    );
  }

  function handleCreatedTour(newTour) {
    if (newTour) {
      setShowTours((prevTours) => [...prevTours, newTour]);
    }
    setShowForm(false);
  }

  return (
    <div className="w-full py-4 sm:py-6">
      <div className="mx-auto grid w-full gap-5">
        <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(88,28,135,0.12)]">
          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-violet-700">
                  Tour Desk
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                  {sortedTours.length} scheduled
                </span>
              </div>

              <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                Manage tour dates, posters, venues, and booking status.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Keep upcoming shows easy to scan with a calendar view and a
                clean event board for quick admin review.
              </p>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(109,40,217,0.25)] transition hover:-translate-y-0.5 hover:brightness-105"
                onClick={() => setShowForm(true)}
                title="Add tour"
              >
                <span className="text-lg leading-none">+</span>
                Add Tour
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <StatCard label="Upcoming" value={upcomingTours.length} />
              <StatCard label="Available" value={availableCount} />
              <StatCard
                label="Next show"
                value={nextTour ? dayFormatter.format(getTourDate(nextTour)) : "None"}
              />
            </div>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <TourCalendar
            activeMonth={activeMonth}
            calendarEvents={calendarEvents}
            onChangeMonth={changeMonth}
          />

          <TourBoard tours={sortedTours} isLoading={isLoading} />
        </div>
      </div>

      {showForm && (
        <TourForm
          onClose={() => setShowForm(false)}
          onCreatedTour={handleCreatedTour}
        />
      )}
    </div>
  );
};

const StatCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
        {label}
      </p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">{value}</h2>
    </div>
  );
};

const TourCalendar = ({ activeMonth, calendarEvents, onChangeMonth }) => {
  const calendarDays = useMemo(
    () => buildCalendarDays(activeMonth),
    [activeMonth],
  );

  return (
    <section className="rounded-[28px] bg-white p-5 shadow-[0_20px_50px_rgba(88,28,135,0.1)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-500">
            Calendar
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-950">
            {monthFormatter.format(activeMonth)}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-700 transition hover:bg-violet-100 hover:text-violet-700"
            onClick={() => onChangeMonth(-1)}
            title="Previous month"
          >
            &lt;
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-700 transition hover:bg-violet-100 hover:text-violet-700"
            onClick={() => onChangeMonth(1)}
            title="Next month"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        {weekdayLabels.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        {calendarDays.map((day) => {
          const dayEvents = day.dateKey ? calendarEvents[day.dateKey] || [] : [];
          const hasEvents = dayEvents.length > 0;

          return (
            <div
              key={day.key}
              className={`min-h-20 rounded-2xl border p-2 ${
                day.day
                  ? hasEvents
                    ? "border-violet-200 bg-violet-50"
                    : "border-slate-100 bg-slate-50"
                  : "border-transparent"
              }`}
            >
              {day.day && (
                <>
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-black ${
                        hasEvents
                          ? "bg-violet-600 text-white"
                          : "text-slate-700"
                      }`}
                    >
                      {day.day}
                    </span>
                    {hasEvents && (
                      <span className="text-xs font-bold text-violet-700">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  {hasEvents && (
                    <div className="mt-2 hidden gap-1 sm:grid">
                      {dayEvents.slice(0, 2).map((tour) => (
                        <p
                          key={tour._id || tour.tourName}
                          className="truncate rounded-full bg-white px-2 py-1 text-left text-[0.68rem] font-bold text-slate-700"
                          title={tour.tourName}
                        >
                          {tour.tourName}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const TourBoard = ({ tours, isLoading }) => {
  return (
    <section className="rounded-[28px] bg-white p-5 shadow-[0_20px_50px_rgba(88,28,135,0.1)] sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-500">
            Schedule
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-950">
            Upcoming Events
          </h2>
        </div>
        <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">
          {tours.length} tours
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        {isLoading && (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm font-semibold text-slate-500">
            Loading tour schedule...
          </div>
        )}

        {!isLoading && tours.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
            <h3 className="text-lg font-black text-slate-900">No tours yet</h3>
            <p className="mt-2 text-sm text-slate-500">
              Add the first tour to make it appear on this board and calendar.
            </p>
          </div>
        )}

        {!isLoading &&
          tours.map((tour) => <TourDetails key={tour._id} tourData={tour} />)}
      </div>
    </section>
  );
};

const TourForm = ({ onClose, onCreatedTour }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("tourName", data.tourName);
    formData.append("tourDate", data.tourDate);
    formData.append("tourVenue", data.tourVenue);
    formData.append("tourPoster", data.tourPoster[0]);

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${ApiBase}admin/tour/createTour`, formData, {
        withCredentials: true,
      });

      onCreatedTour(res.data?.data);
    } catch (err) {
      console.log("error while uploading Tour", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-[28px] bg-white p-5 shadow-[0_28px_80px_rgba(15,23,42,0.28)] sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-600">
              New Event
            </p>
            <h1 className="mt-2 text-2xl font-black text-slate-950">
              Add Tour Details
            </h1>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600 transition hover:bg-rose-100 hover:text-rose-600"
            onClick={onClose}
            title="Close form"
          >
            x
          </button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">Tour Name</span>
            <input
              type="text"
              placeholder="Acoustic Nights Live"
              {...register("tourName", { required: true })}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
            {errors.tourName && (
              <span className="text-xs font-semibold text-rose-600">
                Tour name is required.
              </span>
            )}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">
                Tour Date
              </span>
              <input
                type="date"
                {...register("tourDate", { required: true })}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
              {errors.tourDate && (
                <span className="text-xs font-semibold text-rose-600">
                  Date is required.
                </span>
              )}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">
                Tour Venue
              </span>
              <input
                type="text"
                placeholder="Delhi Arena"
                {...register("tourVenue", { required: true })}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
              {errors.tourVenue && (
                <span className="text-xs font-semibold text-rose-600">
                  Venue is required.
                </span>
              )}
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">
              Tour Poster
            </span>
            <input
              type="file"
              accept="image/*"
              {...register("tourPoster", { required: true })}
              className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/60 px-4 py-4 text-sm font-semibold text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-violet-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
            />
            {errors.tourPoster && (
              <span className="text-xs font-semibold text-rose-600">
                Poster is required.
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] px-5 py-3 text-sm font-black text-white shadow-[0_16px_28px_rgba(109,40,217,0.25)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:bg-none"
          >
            <span className="text-lg leading-none">+</span>
            {isSubmitting ? "Creating Tour..." : "Create Tour"}
          </button>
        </form>
      </div>
    </div>
  );
};

const TourDetails = ({ tourData }) => {
  const tourDate = getTourDate(tourData);

  return (
    <article className="grid gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-3 transition hover:-translate-y-0.5 hover:border-violet-200 hover:bg-white hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:grid-cols-[6rem_1fr_auto] sm:items-center">
      <div className="h-24 overflow-hidden rounded-2xl bg-slate-200 sm:h-20">
        {tourData.tourPoster ? (
          <img
            src={tourData.tourPoster}
            alt={tourData.tourName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-violet-100">
            <img src="/tour.svg" alt="" className="h-9 w-9 opacity-70" />
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-lg font-black text-slate-950">
            {tourData.tourName}
          </h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              tourData.availability
                ? "bg-violet-100 text-violet-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {tourData.availability ? "Available" : "Booked"}
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          {tourData.tourVenue || "Venue not added"}
        </p>
      </div>

      <div className="rounded-2xl bg-white px-4 py-3 text-left shadow-sm sm:text-right">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Date
        </p>
        <p className="mt-1 text-sm font-black text-slate-900">
          {tourDate ? dayFormatter.format(tourDate) : "No date"}
        </p>
      </div>
    </article>
  );
};

export default ManageTours;
