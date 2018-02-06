/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';

/*
 When we trigger a push message, the browser receives the push message,
 figures out what service worker the push is for before waking up that 
 service worker and dispatching a push event. We need to listen for this 
 event and show a notification as a result.
 >>> self === service worker
 */
 self.addEventListener('push', function(event) {
  let data = event.data.text();
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${data}"`);

  const title = 'Push Codelab';
  const options = {
    body: data,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  // waitUntil method takes a promise and the browser will keep your service worker alive and running until the promise passed in has resolved.
  //event.waitUntil(self.registration.showNotification(title, options));
  // or re-write like this for better readibility.
  const notificationPromise = self.registration.showNotification(title, options);
  
  event.waitUntil(notificationPromise);
});

// Clicking on the notification
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  // ensure the browser doesn't terminate our service worker before our new window has been displayed.
  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
