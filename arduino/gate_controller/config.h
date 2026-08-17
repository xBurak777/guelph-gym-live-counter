#ifndef GRYPHON_GATE_NETWORK_CONFIG_H
#define GRYPHON_GATE_NETWORK_CONFIG_H

// =====================================================
// LOCAL SECRETS - EDIT BEFORE UPLOADING TO THE ESP32
// DO NOT COMMIT REAL CREDENTIALS TO A PUBLIC REPOSITORY.
// =====================================================

#define WIFI_SSID "YOUR_WIFI_NAME"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// Production website. No trailing slash.
#define API_BASE_URL "https://guelph-gym-live-counter.vercel.app"

// Must exactly match SCAN_API_SECRET in Vercel.
#define SCAN_API_SECRET "PASTE_YOUR_SCAN_API_SECRET_HERE"

#define GATE_ID "gate-1"

// Network timeouts only. These DO NOT alter approved servo timing.
#define WIFI_CONNECT_TIMEOUT_MS 15000UL
#define HTTP_TIMEOUT_MS 6000

#endif
