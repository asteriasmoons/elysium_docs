export type NavItemType = {
  label: string;
  to: string;
  icon?: string;
  children?: NavItemType[];
};

export const NAV: NavItemType[] = [
  { label: "Homepage", to: "/docs/homepage", icon: "/img/icons/home.svg" },

  {
    label: "Getting Started",
    to: "/docs/getting-started",
    icon: "/img/icons/rocket.svg",
  },

  {
    label: "Commands Overview",
    to: "/docs/commands-overview",
    icon: "/img/icons/monitor.svg",
  },

  {
    label: "Commands",
    to: "/docs/category/commands",
    icon: "/img/icons/commands.svg",
    children: [
      {
        label: "Buddy Reads Commands",
        to: "/docs/category/buddy-reads-commands",
        icon: "/img/icons/chat.svg",
        children: [
          {
            label: "/buddyread announce",
            to: "/docs/commands/buddy-reads-commands/buddy-read-announce",
          },
          {
            label: "/buddyread announcements",
            to: "/docs/commands/buddy-reads-commands/buddyread-announcements",
          },
          {
            label: "/buddyread delete",
            to: "/docs/commands/buddy-reads-commands/buddyread-delete",
          },
          {
            label: "/buddyread dm",
            to: "/docs/commands/buddy-reads-commands/buddyread-dm",
          },
          {
            label: "/buddyread finish",
            to: "/docs/commands/buddy-reads-commands/buddyread-finish",
          },
          {
            label: "/buddyread leave",
            to: "/docs/commands/buddy-reads-commands/buddyread-leave",
          },
          {
            label: "/buddyread messages",
            to: "/docs/commands/buddy-reads-commands/buddyread-messages",
          },
          {
            label: "/buddyread pair",
            to: "/docs/commands/buddy-reads-commands/buddyread-pair",
          },
          {
            label: "/buddyread search",
            to: "/docs/commands/buddy-reads-commands/buddyread-search",
          },
          {
            label: "/buddyread sessions",
            to: "/docs/commands/buddy-reads-commands/buddyread-sessions",
          },
          {
            label: "/buddyread status",
            to: "/docs/commands/buddy-reads-commands/buddyread-status",
          },
        ],
      },

      {
        label: "Channel Commands",
        to: "/docs/category/channel-commands",
        icon: "/img/icons/channel.svg",
        children: [
          {
            label: "/channel reset",
            to: "/docs/commands/channel-commands/channel-reset",
          },
          {
            label: "/channel set-gifts",
            to: "/docs/commands/channel-commands/channel-set-gifts",
          },
          {
            label: "/channel set-sprints",
            to: "/docs/commands/channel-commands/channel-set-sprints",
          },
          {
            label: "/channel view",
            to: "/docs/commands/channel-commands/channel-view",
          },
        ],
      },

      {
        label: "Easter Egg Commands",
        to: "/docs/category/easter-egg-commands",
        icon: "/img/icons/egg.svg",
        children: [
          {
            label: "/affirmation",
            to: "/docs/commands/easter-egg-commands/affirmation",
          },
          { label: "/moon", to: "/docs/commands/easter-egg-commands/moon" },
          { label: "/tarot", to: "/docs/commands/easter-egg-commands/tarot" },
        ],
      },

      {
        label: "Embed Commands",
        to: "/docs/category/embed-commands",
        icon: "/img/icons/notes.svg",
        children: [
          {
            label: "/embed create",
            to: "/docs/commands/embed-commands/embed-create",
          },
          {
            label: "/embed delete",
            to: "/docs/commands/embed-commands/embed-delete",
          },
          {
            label: "/embed edit",
            to: "/docs/commands/embed-commands/embed-edit",
          },
          {
            label: "/embed list",
            to: "/docs/commands/embed-commands/embed-list",
          },
          {
            label: "/embed send",
            to: "/docs/commands/embed-commands/embed-send",
          },
          {
            label: "/embed view",
            to: "/docs/commands/embed-commands/embed-view",
          },
        ],
      },

      {
        label: "Habit Commands",
        to: "/docs/category/habit-commands",
        icon: "/img/icons/calendar.svg",
        children: [
          {
            label: "/habit add",
            to: "/docs/commands/habit-commands/habit-add",
          },
          {
            label: "/habit list",
            to: "/docs/commands/habit-commands/habit-list",
          },
          {
            label: "/habit points",
            to: "/docs/commands/habit-commands/habit-points",
          },
          {
            label: "/habit remove",
            to: "/docs/commands/habit-commands/habit-remove",
          },
          {
            label: "/habit reschedule",
            to: "/docs/commands/habit-commands/habit-reschedule",
          },
          {
            label: "/habit stats",
            to: "/docs/commands/habit-commands/habit-stats",
          },
        ],
      },

      {
        label: "Inventory Commands",
        to: "/docs/category/inventory-commands",
        icon: "/img/icons/books.svg",
        children: [
          {
            label: "/inventory addbook",
            to: "/docs/commands/inventory-commands/inventory-addbook",
          },
          {
            label: "/inventory bookremove",
            to: "/docs/commands/inventory-commands/inventory-bookremove",
          },
          {
            label: "/inventory listbooks",
            to: "/docs/commands/inventory-commands/inventory-listbooks",
          },
        ],
      },

      {
        label: "Journal Commands",
        to: "/docs/category/journal-commands",
        icon: "/img/icons/pencil.svg",
        children: [
          {
            label: "/journal add",
            to: "/docs/commands/journal-commands/journal-add",
          },
          {
            label: "/journal delete",
            to: "/docs/commands/journal-commands/journal-delete",
          },
          {
            label: "/journal edit",
            to: "/docs/commands/journal-commands/journal-edit",
          },
          {
            label: "/journal list",
            to: "/docs/commands/journal-commands/journal-list",
          },
          {
            label: "/journal view",
            to: "/docs/commands/journal-commands/journal-view",
          },
        ],
      },

      {
        label: "Mood Commands",
        to: "/docs/category/mood-commands",
        icon: "/img/icons/mood.svg",
        children: [
          { label: "/mood log", to: "/docs/commands/mood-commands/mood-log" },
          {
            label: "/mood remind off",
            to: "/docs/commands/mood-commands/mood-remind-off",
          },
          {
            label: "/mood remind set",
            to: "/docs/commands/mood-commands/mood-remind-set",
          },
          {
            label: "/mood remind status",
            to: "/docs/commands/mood-commands/mood-remind-status",
          },
          {
            label: "/mood stats",
            to: "/docs/commands/mood-commands/mood-stats",
          },
        ],
      },

      {
        label: "Profile Commands",
        to: "/docs/category/profile-commands",
        icon: "/img/icons/user.svg",
        children: [
          {
            label: "/profile edit",
            to: "/docs/commands/profile-commands/profile-edit",
          },
          {
            label: "/profile set",
            to: "/docs/commands/profile-commands/profile-set",
          },
          {
            label: "/profile view",
            to: "/docs/commands/profile-commands/profile-view",
          },
        ],
      },

      {
        label: "Progress Commands",
        to: "/docs/category/progress-commands",
        icon: "/img/icons/progress.svg",
        children: [
          {
            label: "/progress history",
            to: "/docs/commands/progress-commands/progress-history",
          },
          {
            label: "/progress leaderboard",
            to: "/docs/commands/progress-commands/progress-leaderboard",
          },
          {
            label: "/progress log",
            to: "/docs/commands/progress-commands/progress-log",
          },
          {
            label: "/progress streak",
            to: "/docs/commands/progress-commands/progress-streak",
          },
        ],
      },

      {
        label: "Recommendations Commands",
        to: "/docs/category/recommendations-commands",
        icon: "/img/icons/ball.svg",
        children: [
          {
            label: "/recommend genres",
            to: "/docs/commands/recommend-commands/recommend-genres",
          },
          {
            label: "/recommend get",
            to: "/docs/commands/recommend-commands/recommend-get",
          },
          {
            label: "/recommend interval",
            to: "/docs/commands/recommend-commands/recommend-interval",
          },
          {
            label: "/recommend language",
            to: "/docs/commands/recommend-commands/recommend-language",
          },
          {
            label: "/recommend notify",
            to: "/docs/commands/recommend-commands/recommend-notify",
          },
          {
            label: "/recommend set",
            to: "/docs/commands/recommend-commands/recommend-set",
          },
          {
            label: "/recommend show",
            to: "/docs/commands/recommend-commands/recommend-show",
          },
        ],
      },

      {
        label: "Reminder Commands",
        to: "/docs/category/reminder-commands",
        icon: "/img/icons/alarm.svg",
        children: [
          {
            label: "/reminders channel add",
            to: "/docs/commands/reminder-commands/reminders-channel-add",
          },
          {
            label: "/reminders channel list",
            to: "/docs/commands/reminder-commands/reminders-channel-list",
          },
          {
            label: "/reminders channel remove",
            to: "/docs/commands/reminder-commands/reminders-channel-remove",
          },
          {
            label: "/reminders list",
            to: "/docs/commands/reminder-commands/reminders-list",
          },
          {
            label: "/reminders message",
            to: "/docs/commands/reminder-commands/reminders-message",
          },
          {
            label: "/reminders remove",
            to: "/docs/commands/reminder-commands/reminders-remove",
          },
          {
            label: "/reminders reschedule",
            to: "/docs/commands/reminder-commands/reminders-reschedule",
          },
          {
            label: "/reminders set",
            to: "/docs/commands/reminder-commands/reminders-set",
          },
          {
            label: "/reminders timezone",
            to: "/docs/commands/reminder-commands/reminders-timezone",
          },
        ],
      },

      {
        label: "Review Commands",
        to: "/docs/category/review-commands",
        icon: "/img/icons/review.svg",
        children: [
          {
            label: "/review add",
            to: "/docs/commands/review-commands/review-add",
          },
          {
            label: "/review author",
            to: "/docs/commands/review-commands/review-author",
          },
          {
            label: "/review book",
            to: "/docs/commands/review-commands/review-book",
          },
          {
            label: "/review delete",
            to: "/docs/commands/review-commands/review-delete",
          },
          {
            label: "/review edit",
            to: "/docs/commands/review-commands/review-edit",
          },
          {
            label: "/review list",
            to: "/docs/commands/review-commands/review-list",
          },
          {
            label: "/review view",
            to: "/docs/commands/review-commands/review-view",
          },
        ],
      },

      {
        label: "Sprint Commands",
        to: "/docs/category/sprint-commands",
        icon: "/img/icons/bolt.svg",
        children: [
          {
            label: "/sprint end",
            to: "/docs/commands/sprint-commands/sprint-end",
          },
          {
            label: "/sprint finish",
            to: "/docs/commands/sprint-commands/sprint-finish",
          },
          {
            label: "/sprint join",
            to: "/docs/commands/sprint-commands/sprint-join",
          },
          {
            label: "/sprint leaderboard",
            to: "/docs/commands/sprint-commands/sprint-leaderboard",
          },
          {
            label: "/sprint set-role",
            to: "/docs/commands/sprint-commands/sprint-set-role",
          },
          {
            label: "/sprint start",
            to: "/docs/commands/sprint-commands/sprint-start",
          },
          {
            label: "/sprint timeleft",
            to: "/docs/commands/sprint-commands/sprint-timeleft",
          },
        ],
      },

      {
        label: "Standalone Commands",
        to: "/docs/category/standalone-commands",
        icon: "/img/icons/menu.svg",
        children: [
          {
            label: "/booksummary",
            to: "/docs/commands/standalone-commands/booksummary",
          },
          { label: "/donate", to: "/docs/commands/standalone-commands/donate" },
          {
            label: "/giftlist",
            to: "/docs/commands/standalone-commands/giftlist",
          },
          { label: "/help", to: "/docs/commands/standalone-commands/help" },
          { label: "/report", to: "/docs/commands/standalone-commands/report" },
        ],
      },

      {
        label: "TBR Commands",
        to: "/docs/category/tbr-commands",
        icon: "/img/icons/book.svg",
        children: [
          { label: "/tbr add", to: "/docs/commands/tbr-commands/tbr-add" },
          { label: "/tbr list", to: "/docs/commands/tbr-commands/tbr-list" },
          {
            label: "/tbr remove",
            to: "/docs/commands/tbr-commands/tbr-remove",
          },
        ],
      },
    ],
  },

  {
    label: "Troubleshooting",
    to: "/docs/troubleshooting",
    icon: "/img/icons/tools.svg",
  },
  {
    label: "Contributing",
    to: "/docs/contributing",
    icon: "/img/icons/handheart.svg",
  },
  { label: "Our Discord", to: "/docs/discord", icon: "/img/icons/discord.svg" },
  { label: "Mission Statement", to: "/docs/mission-statement", icon: "/img/icons/loveflag.svg" },
];
