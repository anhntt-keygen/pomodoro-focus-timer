/**
 * Pomodoro Focus Timer - Core Business Logic & State Management
 * Developed by Vibecode Senior Full-Stack Developer
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE MANAGEMENT ---
  const DEFAULT_CONFIG = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15
  };

  let config = { ...DEFAULT_CONFIG };
  let currentMode = 'focus'; // 'focus', 'shortBreak', 'longBreak'
  let timerState = 'idle'; // 'idle', 'running', 'paused'
  let timeLeft = config[currentMode] * 60;
  let totalDuration = config[currentMode] * 60;
  let timerInterval = null;
  let lastTickTime = null;
  let history = [];

  // --- DOM ELEMENTS ---
  const timerCountdown = document.getElementById('timer-countdown');
  const timerStatusLabel = document.getElementById('timer-status-label');
  const btnStart = document.getElementById('btn-start');
  const btnPause = document.getElementById('btn-pause');
  const btnReset = document.getElementById('btn-reset');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const progressRingCircle = document.querySelector('.progress-ring__circle');
  
  // Settings Modal Elements
  const settingsToggleBtn = document.getElementById('settings-toggle-btn');
  const settingsModal = document.getElementById('settings-modal');
  const settingsCloseBtn = document.getElementById('settings-close-btn');
  const settingsForm = document.getElementById('settings-form');
  const btnSettingsReset = document.getElementById('btn-settings-reset');
  const inputFocus = document.getElementById('input-focus');
  const inputShort = document.getElementById('input-short');
  const inputLong = document.getElementById('input-long');
  const settingsErrorMsg = document.getElementById('settings-error-msg');

  // History & Stats Elements
  const historyList = document.getElementById('history-list');
  const historyEmptyState = document.getElementById('history-empty-state');
  const btnClearHistory = document.getElementById('btn-clear-history');
  const statTotalSessions = document.getElementById('stat-total-sessions');