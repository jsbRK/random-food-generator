/* ═══════════════════════════════════════════════════════════
   VIN DECODER — Main Application Script
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ── Sample VINs ──────────────────────────────────────────
    const SAMPLE_VINS = [
        '1HGBH41JXMN109186',
        '5YJSA1DN5DFP14705',
        '1FTFW1ET5DFC10312',
        'WBAPH5C55BA271035',
        '2HGFG12668H507456',
        '1G1YY22G965109378',
        'JN1TBNT30Z0000001',
        'WAUZZZ8V5KA012345',
    ];

    // ── Supported Brands ─────────────────────────────────────
    const BRANDS = [
        { name: 'Toyota', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Toyota_black_logo.png" alt="Toyota" width="80%" class="logo-img">' },
        { name: 'Honda', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/archive/3/38/20161102193538%21Honda.svg" alt="Honda" width="60%" class="logo-img">' },
        { name: 'Ford', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg" alt="Ford" width="90%" class="logo-img">' },
        { name: 'Chevrolet', emoji: '<img src="https://upload.wikimedia.org/wikipedia/nah/3/34/Chevrolet_logo.png" alt="Chevrolet" width="60%" class="logo-img">' },
        { name: 'BMW', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Mercedes', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" alt="Mercedes" width="50%" class="logo-img">' },
        { name: 'Audi', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg" alt="BMW" width="80%" class="logo-img">' },
        { name: 'Volkswagen', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Nissan', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Nissan_logo.jpg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Hyundai', emoji: '<img src="https://logos-world.net/wp-content/uploads/2021/03/Hyundai-Logo.png" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Kia', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/KIA_logo3.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Tesla', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Teslalogo.png" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Subaru', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Subarulogo.png" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Mazda', emoji: '<img src="https://upload.wikimedia.org/wikipedia/nah/b/b1/Mazda_logo.png" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Lexus', emoji: '<img src="https://upload.wikimedia.org/wikipedia/en/d/d1/Lexus_division_emblem.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Jeep', emoji: '<p class="text-2xl font-bold">Jeep</p>' },
        { name: 'Dodge', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Chrysler', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Volvo', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Porsche', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Jaguar', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Land Rover', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Acura', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" width="50%" class="logo-img">' },
        { name: 'Infiniti', emoji: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" width="50%" class="logo-img">' },
    ];

    // ── NHTSA API Field Mappings ─────────────────────────────
    const VEHICLE_INFO_FIELDS = [
        { key: 'Make', label: 'Make', icon: 'tag' },
        { key: 'Model', label: 'Model', icon: 'cube' },
        { key: 'ModelYear', label: 'Year', icon: 'calendar' },
        { key: 'Trim', label: 'Trim', icon: 'adjustments' },
        { key: 'VehicleType', label: 'Vehicle Type', icon: 'truck' },
        { key: 'BodyClass', label: 'Body Style', icon: 'car' },
        { key: 'Manufacturer', label: 'Manufacturer', icon: 'building' },
        { key: 'PlantCountry', label: 'Country of Origin', icon: 'globe' },
        { key: 'PlantCity', label: 'Assembly Plant City', icon: 'location' },
        { key: 'PlantState', label: 'Assembly Plant State', icon: 'map' },
    ];

    const SPECS_FIELDS = [
        { key: 'EngineConfiguration', label: 'Engine Config', icon: 'cog' },
        { key: 'EngineCylinders', label: 'Cylinders', icon: 'hash' },
        { key: 'DisplacementL', label: 'Displacement (L)', icon: 'beaker' },
        { key: 'EngineHP', label: 'Horsepower', icon: 'lightning' },
        { key: 'FuelTypePrimary', label: 'Fuel Type', icon: 'fire' },
        { key: 'TransmissionStyle', label: 'Transmission', icon: 'switch' },
        { key: 'DriveType', label: 'Drive Type', icon: 'arrows' },
        { key: 'Doors', label: 'Doors', icon: 'door' },
        { key: 'GVWR', label: 'GVWR', icon: 'scale' },
        { key: 'EngineKW', label: 'Engine (kW)', icon: 'bolt' },
    ];

    const SAFETY_FIELDS = [
        { key: 'AirBagLocFront', label: 'Front Air Bags', icon: 'shield' },
        { key: 'AirBagLocSide', label: 'Side Air Bags', icon: 'shield' },
        { key: 'AirBagLocCurtain', label: 'Curtain Air Bags', icon: 'shield' },
        { key: 'AirBagLocKnee', label: 'Knee Air Bags', icon: 'shield' },
        { key: 'SeatBeltsAll', label: 'Seat Belts', icon: 'check' },
        { key: 'ForwardCollisionWarning', label: 'Forward Collision Warning', icon: 'alert' },
        { key: 'LaneDepartureWarning', label: 'Lane Departure Warning', icon: 'road' },
        { key: 'ABS', label: 'Anti-lock Brakes (ABS)', icon: 'lock' },
        { key: 'ESC', label: 'Electronic Stability Control', icon: 'refresh' },
        { key: 'TPMS', label: 'Tire Pressure Monitoring', icon: 'gauge' },
        { key: 'AutoReverseSystem', label: 'Auto Reverse System', icon: 'undo' },
        { key: 'BackupCamera', label: 'Backup Camera', icon: 'camera' },
    ];

    // ── SVG Icon Templates ───────────────────────────────────
    const ICONS = {
        tag: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>',
        cube: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
        calendar: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
        adjustments: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>',
        truck: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>',
        car: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 17h.01M16 17h.01M3 11l1.5-5A2 2 0 016.4 4h11.2a2 2 0 011.9 1.38L21 11M3 11v6a1 1 0 001 1h1m16-7v6a1 1 0 01-1 1h-1M3 11h18"/></svg>',
        building: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
        globe: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        location: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
        map: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>',
        cog: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
        hash: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/></svg>',
        beaker: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
        lightning: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
        fire: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>',
        switch: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>',
        arrows: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>',
        door: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 21V3h16v18M15 12h.01"/></svg>',
        scale: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>',
        bolt: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
        shield: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
        check: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',
        alert: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>',
        road: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20H5.586a1 1 0 01-.707-1.707l11-11a1 1 0 011.414 0l.586.586M9 20h10M9 20v-4m10 4v-4m-6 4v-4"/></svg>',
        lock: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>',
        refresh: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
        gauge: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        undo: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>',
        camera: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
    };

    // ═══════════════════════════════════════════════════════════
    //  VALIDATION CONTROLLER
    // ═══════════════════════════════════════════════════════════
    const ValidationController = {
        INVALID_CHARS: /[IOQ]/gi,
        VALID_VIN_REGEX: /^[A-HJ-NPR-Z0-9]{17}$/,

        validate(vin) {
            const result = { valid: false, message: '', type: '' };

            if (!vin || vin.length === 0) {
                result.message = '';
                result.type = '';
                return result;
            }

            // Check for invalid characters
            const invalidMatch = vin.match(/[IOQ]/gi);
            if (invalidMatch) {
                const chars = [...new Set(invalidMatch.map(c => c.toUpperCase()))].join(', ');
                result.message = `Invalid character(s): ${chars}. Letters I, O, and Q are not used in VINs.`;
                result.type = 'error';
                return result;
            }

            // Check for non-alphanumeric characters
            if (/[^A-HJ-NPR-Z0-9]/i.test(vin)) {
                result.message = 'VIN can only contain letters (A-Z, excluding I, O, Q) and numbers (0-9).';
                result.type = 'error';
                return result;
            }

            // Check length
            if (vin.length < 17) {
                result.message = `VIN must be 17 characters. Currently: ${vin.length} characters.`;
                result.type = 'error';
                return result;
            }

            if (vin.length === 17) {
                result.valid = true;
                result.message = 'Valid VIN format. Ready to decode!';
                result.type = 'success';
                return result;
            }

            return result;
        },

        sanitize(input) {
            // Remove any characters that are not alphanumeric, convert to uppercase
            return input.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 17);
        }
    };

    // ═══════════════════════════════════════════════════════════
    //  API CONTROLLER
    // ═══════════════════════════════════════════════════════════
    const APIController = {
        BASE_URL: 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/',
        TIMEOUT: 15000,

        async decode(vin) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

            try {
                const response = await fetch(
                    `${this.BASE_URL}${vin}?format=json`,
                    { signal: controller.signal }
                );

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();

                if (!data.Results || data.Results.length === 0) {
                    throw new Error('No results returned from NHTSA API');
                }

                const result = data.Results[0];

                // Check for API-level errors
                const errorCode = parseInt(result.ErrorCode, 10);
                if (errorCode && errorCode >= 1 && errorCode <= 5) {
                    const errorText = result.ErrorText || 'Unable to decode VIN';
                    // Show warning but still return results (partial decode)
                    result._warning = errorText;
                }

                return result;
            } catch (error) {
                clearTimeout(timeoutId);
                if (error.name === 'AbortError') {
                    throw new Error('Request timed out. Please check your internet connection and try again.');
                }
                throw error;
            }
        }
    };

    // ═══════════════════════════════════════════════════════════
    //  HISTORY CONTROLLER
    // ═══════════════════════════════════════════════════════════
    const HistoryController = {
        STORAGE_KEY: 'vin_decoder_history',
        MAX_ITEMS: 10,

        getAll() {
            try {
                const data = localStorage.getItem(this.STORAGE_KEY);
                return data ? JSON.parse(data) : [];
            } catch {
                return [];
            }
        },

        add(entry) {
            const history = this.getAll();
            // Remove duplicate if exists
            const filtered = history.filter(h => h.vin !== entry.vin);
            // Add to beginning
            filtered.unshift({
                vin: entry.vin,
                make: entry.make || 'Unknown',
                model: entry.model || 'Unknown',
                year: entry.year || 'N/A',
                timestamp: Date.now()
            });
            // Keep max items
            const trimmed = filtered.slice(0, this.MAX_ITEMS);
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmed));
            } catch { /* localStorage full or disabled */ }
            return trimmed;
        },

        clear() {
            try {
                localStorage.removeItem(this.STORAGE_KEY);
            } catch { /* ignore */ }
        }
    };

    // ═══════════════════════════════════════════════════════════
    //  UI CONTROLLER
    // ═══════════════════════════════════════════════════════════
    const UIController = {
        elements: {},

        init() {
            // Cache DOM elements
            this.elements = {
                vinInput: document.getElementById('vin-input'),
                vinInputWrapper: document.getElementById('vin-input-wrapper'),
                charCount: document.getElementById('char-count'),
                validationMsg: document.getElementById('validation-msg'),
                validationText: document.getElementById('validation-text'),
                decodeBtn: document.getElementById('decode-btn'),
                clearInputBtn: document.getElementById('clear-input-btn'),
                sampleVinBtn: document.getElementById('sample-vin-btn'),
                recentQuickBtn: document.getElementById('recent-quick-btn'),
                loadingSection: document.getElementById('loading-section'),
                resultsSection: document.getElementById('results-section'),
                resultsVinBadge: document.getElementById('results-vin-badge'),
                vehicleInfoGrid: document.getElementById('vehicle-info-grid'),
                specsGrid: document.getElementById('specs-grid'),
                safetyGrid: document.getElementById('safety-grid'),
                vinCharsDisplay: document.getElementById('vin-chars-display'),
                structureDetails: document.getElementById('structure-details'),
                recentSection: document.getElementById('recent-section'),
                recentList: document.getElementById('recent-list'),
                clearHistoryBtn: document.getElementById('clear-history-btn'),
                copyResultBtn: document.getElementById('copy-result-btn'),
                downloadReportBtn: document.getElementById('download-report-btn'),
                shareResultBtn: document.getElementById('share-result-btn'),
                decodeAnotherBtn: document.getElementById('decode-another-btn'),
                mobileNavBtn: document.getElementById('mobile-nav-btn'),
                mobileMenu: document.getElementById('mobile-nav'), // Updated to match vin.html ID
                brandsGrid: document.getElementById('brands-grid'),
                toast: document.getElementById('toast'),
            };

            // Inject Toast structure securely
            if (this.elements.toast) {
                this.elements.toast.innerHTML = `
                    <div class="toast-content glass-card px-4 py-3 rounded-xl shadow-xl flex items-center gap-3">
                        <div class="toast-icon w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>
                        </div>
                        <p class="toast-message text-sm font-semibold text-gray-800 dark:text-white" id="toast-message"></p>
                    </div>
                `;
                // Add CSS for toast since it's not in the main files
                const toastStyle = document.createElement('style');
                toastStyle.innerHTML = `
                    .toast {
                        position: fixed;
                        bottom: 2rem;
                        left: 50%;
                        transform: translate(-50%, 100px);
                        z-index: 9999;
                        opacity: 0;
                        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                        pointer-events: none;
                    }
                    .toast.show {
                        transform: translate(-50%, 0);
                        opacity: 1;
                    }
                    .toast-content { background: rgba(255,255,255,0.95); border: 1px solid rgba(0,0,0,0.1); }
                    .dark .toast-content { background: rgba(15,23,42,0.95); border-color: rgba(255,255,255,0.1); }
                    .toast.success .toast-icon { background: #10b981; }
                    .toast.error .toast-icon { background: #ef4444; }
                    .toast.info .toast-icon { background: #0ea5e9; }
                `;
                document.head.appendChild(toastStyle);
            }
        },

        // Mobile Nav
        toggleMobileMenu() {
            const menu = this.elements.mobileMenu;
            const openIcon = document.getElementById('nav-open-icon');
            const closeIcon = document.getElementById('nav-close-icon');
            const isOpen = !menu.classList.contains('hidden');

            if (isOpen) {
                menu.classList.add('hidden');
                openIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                menu.classList.remove('hidden');
                openIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        },

        closeMobileMenu() {
            const menu = this.elements.mobileMenu;
            const openIcon = document.getElementById('nav-open-icon');
            const closeIcon = document.getElementById('nav-close-icon');
            if (menu) menu.classList.add('hidden');
            if (openIcon) openIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        },

        // Input State
        updateCharCount(length) {
            const el = this.elements.charCount;
            el.textContent = `${length} / 17`;
            el.classList.remove('valid', 'invalid');
            if (length === 17) el.classList.add('valid');
            else if (length > 0) el.classList.add('invalid');
        },

        updateValidation(result) {
            const msg = this.elements.validationMsg;
            const text = this.elements.validationText;

            if (!result.message) {
                msg.classList.add('hidden');
                return;
            }

            text.textContent = result.message;
            msg.classList.remove('hidden');

            // Adjust validation message styling for vin.html
            text.className = `text-sm font-medium py-2.5 px-3 rounded-lg flex items-center gap-2 ${result.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'}`;

            // Add SVG Icon to message
            const svgIcon = result.type === 'error'
                ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
                : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

            text.innerHTML = svgIcon + '<span>' + this.escapeHtml(result.message) + '</span>';

            // Update input border state using wrapper classes defined in vin.html
            const wrapper = this.elements.vinInputWrapper;
            if (wrapper) {
                wrapper.classList.remove('error', 'success');
                if (result.type === 'error') wrapper.classList.add('error');
                else if (result.type === 'success') wrapper.classList.add('success');
            }
        },

        updateDecodeButton(valid) {
            this.elements.decodeBtn.disabled = !valid;
        },

        updateClearButton(show) {
            if (this.elements.clearInputBtn) {
                this.elements.clearInputBtn.style.display = show ? 'block' : 'none';
            }
        },

        // Loading
        showLoading() {
            this.elements.loadingSection.classList.remove('hidden');
            this.elements.resultsSection.classList.add('hidden');
        },

        hideLoading() {
            this.elements.loadingSection.classList.add('hidden');
        },

        // Results
        showResults(data, vin) {
            this.hideLoading();
            this.elements.resultsSection.classList.remove('hidden');
            this.elements.resultsVinBadge.textContent = vin;

            // Populate Vehicle Info
            this.populateGrid(this.elements.vehicleInfoGrid, VEHICLE_INFO_FIELDS, data);

            // Populate Specs
            this.populateGrid(this.elements.specsGrid, SPECS_FIELDS, data);

            // Populate Safety
            this.populateGrid(this.elements.safetyGrid, SAFETY_FIELDS, data);

            // VIN Structure
            this.renderVinStructure(vin, data);

            // Scroll to results
            setTimeout(() => {
                this.elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        },

        populateGrid(container, fields, data) {
            container.innerHTML = '';
            fields.forEach(field => {
                const value = data[field.key];
                const displayValue = value && value.trim() ? value.trim() : 'Not Available';
                const isEmpty = !value || !value.trim();

                const item = document.createElement('div');
                item.className = 'info-card flex flex-col justify-center'; // Match new CSS
                item.innerHTML = `
                    <div class="info-label">
                        ${ICONS[field.icon] || ''}
                        <span>${field.label}</span>
                    </div>
                    <div class="info-value${isEmpty ? ' empty' : ''}">${this.escapeHtml(displayValue)}</div>
                `;
                container.appendChild(item);
            });
        },

        renderVinStructure(vin, data) {
            const container = this.elements.vinCharsDisplay;
            container.innerHTML = '';

            for (let i = 0; i < 17; i++) {
                const char = vin[i] || '?';
                let section = 'vis';
                if (i < 3) section = 'wmi';
                else if (i < 9) section = 'vds';

                const div = document.createElement('div');
                div.className = `vin-structural-char vin-${section}`; // New class names for vin.html
                div.textContent = char;
                container.appendChild(div);
            }

            // Structure details
            const details = this.elements.structureDetails;
            const wmiChars = vin.slice(0, 3);
            const vdsChars = vin.slice(3, 9);
            const visChars = vin.slice(9, 17);

            const manufacturer = data.Manufacturer || data.Make || 'Unknown';
            const country = data.PlantCountry || 'Unknown';

            // New structure-item classes mapped to tailwind + style.css
            details.innerHTML = `
                <div class="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800">
                    <div class="font-bold text-sky-700 dark:text-sky-400 mb-1">WMI — World Manufacturer Identifier (${this.escapeHtml(wmiChars)})</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300">
                        Characters 1–3 identify the manufacturer and country of origin.
                        ${manufacturer !== 'Unknown' ? `<br>Manufacturer: <strong class="text-gray-800 dark:text-white">${this.escapeHtml(manufacturer)}</strong>` : ''}
                        ${country !== 'Unknown' ? ` | Country: <strong class="text-gray-800 dark:text-white">${this.escapeHtml(country)}</strong>` : ''}
                    </div>
                </div>
                <div class="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                    <div class="font-bold text-purple-700 dark:text-purple-400 mb-1">VDS — Vehicle Descriptor Section (${this.escapeHtml(vdsChars)})</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300">
                        Characters 4–9 describe the vehicle's model, body type, engine, transmission, and includes a check digit (position 9).
                        ${data.Model ? `<br>Model: <strong class="text-gray-800 dark:text-white">${this.escapeHtml(data.Model)}</strong>` : ''}
                        ${data.BodyClass ? ` | Body: <strong class="text-gray-800 dark:text-white">${this.escapeHtml(data.BodyClass)}</strong>` : ''}
                    </div>
                </div>
                <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                    <div class="font-bold text-emerald-700 dark:text-emerald-400 mb-1">VIS — Vehicle Identifier Section (${this.escapeHtml(visChars)})</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300">
                        Characters 10–17 identify the model year, assembly plant, and production sequence number.
                        ${data.ModelYear ? `<br>Year: <strong class="text-gray-800 dark:text-white">${this.escapeHtml(data.ModelYear)}</strong>` : ''}
                        ${data.PlantCity ? ` | Plant: <strong class="text-gray-800 dark:text-white">${this.escapeHtml(data.PlantCity)}</strong>` : ''}
                    </div>
                </div>
            `;
        },

        hideResults() {
            this.elements.resultsSection.classList.add('hidden');
        },

        // Recent Searches
        renderRecentSearches(history) {
            const section = this.elements.recentSection;
            const list = this.elements.recentList;
            list.innerHTML = '';

            if (!history || history.length === 0) {
                section.classList.add('hidden');
                return;
            }

            section.classList.remove('hidden');

            history.forEach(item => {
                const div = document.createElement('div');
                div.className = 'recent-item';
                div.dataset.vin = item.vin;
                div.innerHTML = `
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <div class="font-medium text-gray-800 dark:text-white font-mono">${this.escapeHtml(item.vin)}</div>
                            <div class="text-xs text-gray-500">${this.escapeHtml(item.year)} ${this.escapeHtml(item.make)} ${this.escapeHtml(item.model)}</div>
                        </div>
                    </div>
                `;
                list.appendChild(div);
            });
        },

        // Brands
        renderBrands() {
            const grid = this.elements.brandsGrid;
            grid.innerHTML = '';
            BRANDS.forEach(brand => {
                const div = document.createElement('div');
                div.className = 'brand-card';
                div.innerHTML = `
                    <div class="logo-div">${brand.emoji}</div>
                    <div class="mt-auto text-xs font-semibold text-gray-700 dark:text-gray-300">${brand.name}</div>
                `;
                grid.appendChild(div);
            });
        },

        // Tabs
        switchTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tabId);
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.toggle('active', content.id === `tab-${tabId}`);
            });
        },

        // Toast
        showToast(message, type = 'success') {
            const toast = this.elements.toast;
            if (!toast) return;
            const toastMsg = document.getElementById('toast-message');

            const svgEl = toast.querySelector('svg');
            toast.className = 'toast ' + type;

            if (type === 'success') {
                svgEl.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>';
            } else if (type === 'error') {
                svgEl.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
            } else {
                svgEl.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
            }

            toastMsg.textContent = message;
            toast.classList.add('show');

            clearTimeout(this._toastTimer);
            this._toastTimer = setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        },

        // Reset
        resetAll() {
            this.elements.vinInput.value = '';
            this.elements.vinInputWrapper.classList.remove('error', 'success');
            this.updateCharCount(0);
            this.updateValidation({ message: '', type: '' });
            this.updateDecodeButton(false);
            this.updateClearButton(false);
            this.hideResults();
            this.hideLoading();
            this.elements.vinInput.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        // Utility
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = String(text);
            return div.innerHTML;
        }
    };

    // ═══════════════════════════════════════════════════════════
    //  DECODE CONTROLLER
    // ═══════════════════════════════════════════════════════════
    const DecodeController = {
        currentData: null,
        currentVin: '',

        async decode(vin) {
            this.currentVin = vin;

            UIController.showLoading();

            try {
                const data = await APIController.decode(vin);
                this.currentData = data;

                // Save to history
                const history = HistoryController.add({
                    vin: vin,
                    make: data.Make || '',
                    model: data.Model || '',
                    year: data.ModelYear || ''
                });

                UIController.renderRecentSearches(history);
                UIController.showResults(data, vin);

                if (data._warning) {
                    UIController.showToast('Partial decode: ' + data._warning.substring(0, 80), 'info');
                }
            } catch (error) {
                UIController.hideLoading();
                UIController.showToast(error.message || 'Failed to decode VIN. Please try again.', 'error');
            }
        },

        getFormattedReport() {
            if (!this.currentData || !this.currentVin) return '';

            const d = this.currentData;
            const lines = [
                '═══════════════════════════════════════',
                '         VIN DECODER REPORT',
                '═══════════════════════════════════════',
                '',
                `VIN: ${this.currentVin}`,
                `Date: ${new Date().toLocaleDateString()}`,
                '',
                '── Vehicle Information ─────────────────',
            ];

            VEHICLE_INFO_FIELDS.forEach(f => {
                const val = d[f.key] && d[f.key].trim() ? d[f.key].trim() : 'N/A';
                lines.push(`  ${f.label}: ${val}`);
            });

            lines.push('', '── Specifications ─────────────────────');
            SPECS_FIELDS.forEach(f => {
                const val = d[f.key] && d[f.key].trim() ? d[f.key].trim() : 'N/A';
                lines.push(`  ${f.label}: ${val}`);
            });

            lines.push('', '── Safety Features ────────────────────');
            SAFETY_FIELDS.forEach(f => {
                const val = d[f.key] && d[f.key].trim() ? d[f.key].trim() : 'N/A';
                lines.push(`  ${f.label}: ${val}`);
            });

            lines.push('', '── VIN Structure ──────────────────────');
            lines.push(`  WMI (1-3):  ${this.currentVin.slice(0, 3)}  — World Manufacturer Identifier`);
            lines.push(`  VDS (4-9):  ${this.currentVin.slice(3, 9)}  — Vehicle Descriptor Section`);
            lines.push(`  VIS (10-17): ${this.currentVin.slice(9, 17)} — Vehicle Identifier Section`);
            lines.push('', '═══════════════════════════════════════');
            lines.push('  Generated by VIN Decoder Tool');
            lines.push('  Data source: NHTSA vPIC API');
            lines.push('═══════════════════════════════════════');

            return lines.join('\n');
        }
    };

    // ═══════════════════════════════════════════════════════════
    //  APP INITIALIZATION
    // ═══════════════════════════════════════════════════════════
    function initApp() {
        UIController.init();
        UIController.renderBrands();
        UIController.renderRecentSearches(HistoryController.getAll());

        const el = UIController.elements;

        // ── VIN Input ─────────────────────────────
        if (el.vinInput) {
            el.vinInput.addEventListener('input', function () {
                const sanitized = ValidationController.sanitize(this.value);
                if (sanitized !== this.value) {
                    this.value = sanitized;
                }
                const result = ValidationController.validate(sanitized);

                UIController.updateCharCount(sanitized.length);
                UIController.updateValidation(result);
                UIController.updateDecodeButton(result.valid);
                UIController.updateClearButton(sanitized.length > 0);
            });

            el.vinInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && !el.decodeBtn.disabled) {
                    e.preventDefault();
                    el.decodeBtn.click();
                }
            });
        }

        // ── Clear Button ──────────────────────────
        if (el.clearInputBtn) {
            el.clearInputBtn.addEventListener('click', function () {
                UIController.resetAll();
            });
        }

        // ── Sample VIN Button ─────────────────────
        if (el.sampleVinBtn) {
            el.sampleVinBtn.addEventListener('click', function () {
                const random = SAMPLE_VINS[Math.floor(Math.random() * SAMPLE_VINS.length)];
                el.vinInput.value = random;
                el.vinInput.dispatchEvent(new Event('input'));
                UIController.showToast('Sample VIN inserted', 'info');
            });
        }

        // ── Recent Quick Button ───────────────────
        if (el.recentQuickBtn) {
            el.recentQuickBtn.addEventListener('click', function () {
                const rs = document.getElementById('recent-section');
                if (rs && !rs.classList.contains('hidden')) {
                    rs.scrollIntoView({ behavior: 'smooth' });
                } else {
                    UIController.showToast('No recent searches yet', 'info');
                }
            });
        }

        // ── Decode Button ─────────────────────────
        if (el.decodeBtn) {
            el.decodeBtn.addEventListener('click', function () {
                const vin = el.vinInput.value.trim().toUpperCase();
                const validation = ValidationController.validate(vin);
                if (validation.valid) {
                    DecodeController.decode(vin);
                }
            });
        }

        // ── Tab Buttons ───────────────────────────
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                UIController.switchTab(this.dataset.tab);
            });
        });

        // ── Recent Searches Click ─────────────────
        if (el.recentList) {
            el.recentList.addEventListener('click', function (e) {
                const item = e.target.closest('.recent-item');
                if (item) {
                    const vin = item.dataset.vin;
                    el.vinInput.value = vin;
                    el.vinInput.dispatchEvent(new Event('input'));
                    DecodeController.decode(vin);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }

        // ── Clear History ─────────────────────────
        if (el.clearHistoryBtn) {
            el.clearHistoryBtn.addEventListener('click', function () {
                HistoryController.clear();
                UIController.renderRecentSearches([]);
                UIController.showToast('Search history cleared', 'success');
            });
        }

        // ── Copy Results ──────────────────────────
        if (el.copyResultBtn) {
            el.copyResultBtn.addEventListener('click', function () {
                const report = DecodeController.getFormattedReport();
                if (report) {
                    navigator.clipboard.writeText(report).then(() => {
                        UIController.showToast('Report copied to clipboard!', 'success');
                    }).catch(() => {
                        UIController.showToast('Failed to copy. Please try again.', 'error');
                    });
                }
            });
        }

        // ── Download Report ───────────────────────
        if (el.downloadReportBtn) {
            el.downloadReportBtn.addEventListener('click', function () {
                const report = DecodeController.getFormattedReport();
                if (report) {
                    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `VIN_Report_${DecodeController.currentVin}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    UIController.showToast('Report downloaded!', 'success');
                }
            });
        }

        // ── Share Results ─────────────────────────
        if (el.shareResultBtn) {
            el.shareResultBtn.addEventListener('click', async function () {
                const d = DecodeController.currentData;
                if (!d) return;

                const shareData = {
                    title: 'VIN Decoder Report',
                    text: `VIN: ${DecodeController.currentVin}\n${d.ModelYear || ''} ${d.Make || ''} ${d.Model || ''}\nDecoded with VIN Decoder Tool`,
                };

                if (navigator.share) {
                    try {
                        await navigator.share(shareData);
                    } catch {
                        // User cancelled or error
                    }
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(shareData.text).then(() => {
                        UIController.showToast('Share text copied to clipboard!', 'success');
                    }).catch(() => {
                        UIController.showToast('Unable to share. Please copy manually.', 'error');
                    });
                }
            });
        }

        // ── Decode Another ────────────────────────
        if (el.decodeAnotherBtn) {
            el.decodeAnotherBtn.addEventListener('click', function () {
                UIController.resetAll();
            });
        }

        // ── Mobile Nav ────────────────────────────
        if (el.mobileNavBtn) {
            el.mobileNavBtn.addEventListener('click', function () {
                UIController.toggleMobileMenu();
            });
        }

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-nav a').forEach(link => {
            link.addEventListener('click', function () {
                UIController.closeMobileMenu();
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', function (e) {
            if (el.mobileMenu && el.mobileNavBtn && !el.mobileMenu.contains(e.target) && !el.mobileNavBtn.contains(e.target)) {
                UIController.closeMobileMenu();
            }
        });
    }

    // ── Start App ─────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})();
