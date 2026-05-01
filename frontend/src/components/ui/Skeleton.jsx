import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200 dark:bg-slate-800", className)}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col h-full">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
          <Skeleton className="h-5 w-20" />
          <div className="flex space-x-3">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonComponentDetail() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="w-full md:w-2/3 space-y-4">
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-20 rounded-lg" />
            <Skeleton className="h-6 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="w-full md:w-1/3 flex gap-3 mt-6 md:mt-0 md:justify-end">
          <Skeleton className="h-12 w-32 rounded-xl" />
          <Skeleton className="h-12 w-36 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="w-full aspect-video rounded-2xl" />
          <div className="flex space-x-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 space-y-4 border border-slate-200 dark:border-slate-800 min-h-[300px]">
            <Skeleton className="h-6 w-1/3 mb-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="card p-6 space-y-4">
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
