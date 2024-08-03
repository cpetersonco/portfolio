---
title: Creating a Google Calendar endpoint
description:
    Generating a public Google Calendar endpoint for my local movie theater!
author: cpeterson
slug: loft-cinema-webcal-calendar
pubDate: 2022-08-06
---

Like many people, my life runs off my Google Calendar. **If it is not on my
calendar, it does not exist.** For years I wanted to be able to view local
events, such as local theater showtimes or concerts, from within my curated
Google Calendar setup. There have been many times I've found myself missing a
local event, not because I was busy, but because I simply didn't know it was
happening.

I decided on [The Loft Cinema](https://loftcinema.org), a local cinema I
frequent, as my first attempt at solving this problem. After a few iterations
using OCR on an image of showtimes (which went about as well as you would
think...) and third-party showtime APIs such as Fandango, the Loft Cinema made a
timely upgrade to their website, publishing their showtimes on their webpage as
static HTML! Harnessing the power of Javascript libraries axios and Cheerio for
web scaping (thanks Abayomi Ogunnusi for
[the helpful blog post](https://dev.to/drsimplegraffiti/i-scraped-dev-to-using-axios-and-cheerio-26ko)),
I was able to gather each showtime, along with a description, runtime, and a
link to buy tickets. Now, the question was how to get this JSON object into my
calendar.

Using another Javascript library called ics for generating iCalendar files, I
was able to feed my showtime data into an iCal file. iCalendar is a widely
supported file standard for defining calendar events, first adopted by Apple
iCal calendar application. However, this isn't a user-friendly experience as
most people have no interest in locally generating iCal files and importing the
file into their calendar. How can I publicly distribute iCal files to allow for
a more seamless user experience?

In comes the Webcal,
[a URI scheme for serving iCalendar files](https://en.wikipedia.org/wiki/Webcal)
(https is another common example of a URI scheme). By serving an iCal file on a
web server, users can use "webcal://" before the URL for a hosted iCal file to
utilize this technology on their calendar applications. And the best part about
the Webcal protocol is that it accounts for changes in the calendar file,
allowing for updates as more showtimes are added to the file.

If you are interested in adding the Loft Cinema to your calendar, select "from
URL" under the Import section in your Calendar application and use
`webcal://loft.cpeterson.co/event.ics` as the URL. Your Calendar application
should immediately retrieve the events and will update daily with newly released
showtimes. For more information, see this post from Google on
[importing public calendars to Google Calendar](https://support.google.com/calendar/answer/37100).

[The repository for this project](https://github.com/cpetersonco/ical-generator)
can be found on Github. For future iterations, I'd like to expand to other local
locations, such as concert venues and community centers.

My deployment strategy consists of a single Node.js file for the web scraping
and ical generation, deployed on Netlify daily using a deploy webhook from
Netlify and a daily cron job in Github Actions.
