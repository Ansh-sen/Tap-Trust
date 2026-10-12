/**
 * TAP TRUST — DEMO STUDIO INTERACTION ENGINE
 * Apple Design Guidelines (Fluid Motion, Interruptible State, Accessible Dialogs)
 */

(() => {
  'use strict';

  // --- 1. Toast Notification System ---
  let toastTimer = null;
  const showToast = (message, duration = 3000) => {
    let toast = document.querySelector('.ds-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'ds-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML = `<span class="ds-toast-dot"></span><span class="ds-toast-msg"></span>`;
      document.body.appendChild(toast);
    }
    const msgEl = toast.querySelector('.ds-toast-msg');
    if (msgEl) msgEl.textContent = message;

    toast.classList.add('is-active');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-active');
    }, duration);
  };

  // --- 2. Universal Simulated Action Modal ---
  let lastActiveElement = null;

  const demoActionDetails = {
    // Salon actions
    'salon-review': {
      title: 'Google Review Redirection',
      badge: 'Counter NFC Stand',
      icon: '★',
      desc: 'On a real TAP TRUST stand at the salon checkout, tapping an iPhone or Android instantly opens the salon\'s verified Google Review form with 5 stars pre-selected.',
      note: 'This eliminates search friction. Customers do not need to look up your salon name, spell it correctly, or browse through search results.'
    },
    'salon-booking': {
      title: 'Appointment Booking Flow',
      badge: 'Mirror / Desk Tag',
      icon: '📅',
      desc: 'Directs the client immediately to your scheduling link (Fresha, Calendly, or custom booking portal) with the selected stylist pre-filtered.',
      note: 'Demonstration only: In a production setup, this seamlessly bridges in-salon clients into regular recurring re-bookings.'
    },
    'salon-portfolio': {
      title: 'Instagram & Portfolio Showcase',
      badge: 'Waiting Lounge Tag',
      icon: '✂',
      desc: 'Opens the salon\'s curated lookbook or Instagram profile so waiting clients can browse real cuts, color transformations, and stylist portfolios.',
      note: 'Demonstration only: No live Instagram profile is loaded here.'
    },
    'salon-whatsapp': {
      title: 'WhatsApp Stylist Consultation',
      badge: 'Business Card Tag',
      icon: '💬',
      desc: 'Launches WhatsApp with a pre-written message: "Hi Morrow Studio, I\'d like to ask a question regarding an appointment."',
      note: 'Demonstration only: No personal numbers are used or messaged.'
    },

    // Café actions
    'cafe-menu': {
      title: 'Contactless Table Menu',
      badge: 'Table 04 NFC Disc',
      icon: '☕',
      desc: 'Table-side NFC tags allow customers to open this live digital menu in under 2 seconds. No physical paper menus to clean or reprint when seasonal items rotate.',
      note: 'Demonstration only: Shows current sample offerings with dietary and allergen indicators.'
    },
    'cafe-wifi': {
      title: 'One-Tap Guest Wi-Fi',
      badge: 'In-Café Utility',
      icon: '📶',
      desc: 'Guests tap to reveal network credentials or auto-connect without typing complex passwords on tiny keyboards.',
      note: 'Wi-Fi network "SlowMorning-Guest" password copied to clipboard (simulated).'
    },
    'cafe-reserve': {
      title: 'Table Reservation Demo',
      badge: 'Counter Stand',
      icon: '🍽',
      desc: 'Directs diners to your reservation engine (Zomato Dining, OpenTable, or direct WhatsApp booking) for their next visit.',
      note: 'Demonstration only: Fictional café. No real table reservation has been placed.'
    },
    'cafe-directions': {
      title: 'Map & Walking Directions',
      badge: 'Digital Destination',
      icon: '📍',
      desc: 'Opens Google Maps navigation directly to the venue, making sharing the café location with friends effortless.',
      note: 'Demonstration only: Fictional location in Sagar, Madhya Pradesh.'
    },

    // Real Estate actions
    'property-viewing': {
      title: 'Private Viewing Request',
      badge: 'Yard Sign / Brochure Tag',
      icon: '🏠',
      desc: 'Prospective buyers passing the property or holding a printed brochure tap to book an exclusive walkthrough directly with the listing agent.',
      note: 'Demonstration only: Fictional property "The Pavilion Court". No broker or agency was contacted.'
    },
    'property-brochure': {
      title: 'Digital Spec Sheet & Floor Plan',
      badge: 'Brochure NFC Tag',
      icon: '📄',
      desc: 'Instant delivery of the full architectural specification sheet, floor dimensions, and neighborhood master plan without paper waste.',
      note: 'Simulated brochure download: In production, this delivers high-res PDF or interactive walkthrough.'
    },
    'property-agent': {
      title: 'Direct Agent Contact',
      badge: 'Listing Card',
      icon: '📞',
      desc: 'Instantly connects qualified buyers to listing agent Priya Sharma via direct phone or verified WhatsApp.',
      note: 'Demonstration only: Fictional agent profile.'
    },
    'property-share': {
      title: 'Share Property Listing',
      badge: 'Quick Link',
      icon: '🔗',
      desc: 'Generates a clean, trackable listing link ready to share with family or co-buyers.',
      note: 'Listing URL copied to clipboard (simulated demo).'
    },

    // Hotel & Stay actions
    'stay-wifi': {
      title: 'In-Room High-Speed Wi-Fi',
      badge: 'Bedside Stand · Room 204',
      icon: '📶',
      desc: 'Network: KoyaHouse-Guest\nPassword: stayquietly2026\n\nPassword has been copied to your clipboard.',
      note: 'Demonstration credentials only: In a real hotel, this connects guests directly to guest Wi-Fi portal.'
    },
    'stay-reception': {
      title: 'Front Desk Concierge (Ext. 0)',
      badge: 'In-Room Service',
      icon: '🛎',
      desc: 'Guests can message the duty manager or front desk on WhatsApp for extra towels, luggage storage, or late checkout without using a landline.',
      note: 'Demonstration only: Fictional boutique stay.'
    },
    'stay-dining': {
      title: 'Courtyard Dining & Room Service',
      badge: 'Hospitality Tag',
      icon: '🍳',
      desc: 'Breakfast served 7:30 AM – 10:30 AM in the central courtyard. Tap opens the daily chef\'s tasting menu and tea selections.',
      note: 'Demonstration only: Fictional breakfast schedule.'
    },
    'stay-feedback': {
      title: 'Private Guest Feedback',
      badge: 'Departure Tag',
      icon: '💬',
      desc: 'Allows guests to share private feedback directly with the General Manager before posting a public review, giving staff a chance to resolve any issues immediately.',
      note: 'Demonstration only: Fictional feedback loop.'
    }
  };

  const ensureModalHtml = () => {
    let scrim = document.querySelector('.ds-modal-scrim');
    if (!scrim) {
      scrim = document.createElement('div');
      scrim.className = 'ds-modal-scrim';
      scrim.setAttribute('role', 'dialog');
      scrim.setAttribute('aria-modal', 'true');
      scrim.setAttribute('aria-hidden', 'true');
      scrim.innerHTML = `
        <div class="ds-modal-card">
          <div class="ds-modal-header">
            <div class="ds-modal-title-wrap">
              <div class="ds-modal-icon" aria-hidden="true">★</div>
              <div>
                <span class="ds-modal-badge">DEMO SIMULATION</span>
                <h2 class="ds-modal-title">Sample Interaction</h2>
              </div>
            </div>
            <button class="ds-modal-close" aria-label="Close dialog">×</button>
          </div>
          <div class="ds-modal-body">
            <p class="ds-modal-desc"></p>
            <div class="ds-modal-simulation-note">
              <strong>Illustrative Experience</strong>
              <span class="ds-modal-note-text"></span>
            </div>
          </div>
          <div class="ds-modal-footer">
            <button class="ds-btn ds-btn-primary ds-btn-sm ds-modal-confirm">Got it</button>
          </div>
        </div>
      `;
      document.body.appendChild(scrim);

      // Dismissal events
      scrim.addEventListener('click', (e) => {
        if (e.target === scrim) closeModal();
      });
      scrim.querySelector('.ds-modal-close').addEventListener('click', closeModal);
      scrim.querySelector('.ds-modal-confirm').addEventListener('click', closeModal);

      // Keyboard escape listener
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && scrim.classList.contains('is-open')) {
          closeModal();
        }
      });
    }
    return scrim;
  };

  const openModal = (actionKey, triggerBtn) => {
    lastActiveElement = triggerBtn || document.activeElement;
    const scrim = ensureModalHtml();
    const info = demoActionDetails[actionKey] || {
      title: 'Sample Interaction',
      badge: 'TAP TRUST Demo',
      icon: '✳',
      desc: 'This button demonstrates a real NFC/QR customer destination.',
      note: 'In production, this opens your real business destination without app installation.'
    };

    scrim.querySelector('.ds-modal-title').textContent = info.title;
    scrim.querySelector('.ds-modal-badge').textContent = info.badge || 'DEMO SIMULATION';
    scrim.querySelector('.ds-modal-icon').textContent = info.icon || '✳';
    scrim.querySelector('.ds-modal-desc').innerHTML = info.desc.replace(/\n/g, '<br>');
    scrim.querySelector('.ds-modal-note-text').textContent = info.note;

    scrim.classList.add('is-open');
    scrim.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Copy to clipboard helper for wifi
    if (actionKey === 'stay-wifi' || actionKey === 'cafe-wifi') {
      try {
        navigator.clipboard.writeText(actionKey === 'stay-wifi' ? 'stayquietly2026' : 'SlowMorning2026');
        showToast('Wi-Fi password copied to clipboard');
      } catch (err) {
        // Fallback silently if clipboard permissions are restricted
      }
    }

    if (actionKey === 'property-share') {
      try {
        navigator.clipboard.writeText(window.location.href);
        showToast('Property link copied to clipboard');
      } catch (err) {}
    }

    // Set focus inside modal
    const confirmBtn = scrim.querySelector('.ds-modal-confirm');
    if (confirmBtn) confirmBtn.focus();
  };

  const closeModal = () => {
    const scrim = document.querySelector('.ds-modal-scrim');
    if (scrim && scrim.classList.contains('is-open')) {
      scrim.classList.remove('is-open');
      scrim.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }
    }
  };

  // --- 3. Wire up data-ds-action triggers ---
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-ds-action]');
    if (btn) {
      e.preventDefault();
      const action = btn.dataset.dsAction;
      openModal(action, btn);
    }
  });

  // --- 4. Tab Navigation System (Role=tablist standard) ---
  const tabContainers = document.querySelectorAll('[data-ds-tabs]');
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.ds-tab-btn');
    const targetGroup = container.dataset.dsTabs;
    const panels = document.querySelectorAll(`[data-ds-panel-group="${targetGroup}"]`);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.dsTab;

        tabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        panels.forEach(panel => {
          const panelCategory = panel.dataset.dsPanel;
          if (category === 'all' || panelCategory === category) {
            panel.style.display = '';
            panel.removeAttribute('hidden');
          } else {
            panel.style.display = 'none';
            panel.setAttribute('hidden', 'true');
          }
        });
      });
    });
  });

  // --- 5. Interactive Property Gallery Thumbnail Switcher ---
  const gallery = document.querySelector('[data-ds-gallery]');
  if (gallery) {
    const mainImg = gallery.querySelector('.ds-gallery-main');
    const captionEl = gallery.querySelector('.ds-gallery-caption');
    const thumbs = gallery.querySelectorAll('.ds-gallery-thumb');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');

        const title = thumb.dataset.title;
        const bg = thumb.dataset.bg;
        if (mainImg && bg) {
          mainImg.style.background = bg;
        }
        if (captionEl && title) {
          captionEl.textContent = title;
        }
      });
    });
  }

  // --- 6. Interactive Viewing Schedule Form Demo ---
  const viewingForm = document.querySelector('#viewing-demo-form');
  if (viewingForm) {
    viewingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dateVal = viewingForm.querySelector('input[type="date"]')?.value || 'Upcoming Saturday';
      const slotVal = viewingForm.querySelector('select')?.value || '11:00 AM';

      openModal('property-viewing');
      const descEl = document.querySelector('.ds-modal-desc');
      if (descEl) {
        descEl.innerHTML = `<strong>Viewing Requested for: ${dateVal} at ${slotVal}</strong><br><br>In a production deployment, this submits directly to the agent's calendar and sends a WhatsApp confirmation with gate access PIN.<br><br><em>Demo Mode: No real request or private data was transmitted.</em>`;
      }
    });
  }

  // --- 7. Interactive Feedback Form Demo in Stay ---
  const feedbackForm = document.querySelector('#stay-feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      openModal('stay-feedback');
      const descEl = document.querySelector('.ds-modal-desc');
      if (descEl) {
        descEl.innerHTML = `<strong>Private Guest Note Submitted</strong><br><br>Thank you for testing the guest feedback flow. In a live hotel, this sends a private notification directly to the duty manager's phone so any issue can be rectified prior to checkout.<br><br><em>Demo Mode: No real review was saved or submitted.</em>`;
      }
      feedbackForm.reset();
    });
  }

  // Expose helpers if needed
  window.TapTrustDemo = {
    openModal,
    closeModal,
    showToast
  };
})();
