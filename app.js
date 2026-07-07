const descriptions = {
  normal: "Showing unmapped normal color space.",
  protanopia: "L-cone absence (Red blind). Reduces sensitivity to long wavelength light, blending reds, oranges, and yellows into dull green-yellow tones.",
  deuteranopia: "M-cone absence (Green blind). Mid-wavelength green signals are dropped. Green, orange, red, and brown spaces map to a unified yellow-brown spectrum.",
  tritanopia: "S-cone absence (Blue blind). Extremely rare short-wavelength failure. Blues blend directly into greens, while yellows track identically to pink or red profiles.",
  achromatopsia: "Total color blindness. Driven by complete cone malfunction. All color sensations are omitted, mapping the environment purely by light intensity (monochrome)."
};

// Maximum upload boundary configuration (5MB)
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

// Application State Container
let state = {
  hasImage: false,
  currentMode: 'normal',
  layout: 'split',
  zoom: 100,
  sliderPercentage: 50,
  isDraggingSlider: false
};

// DOM References
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const viewWrapper = document.getElementById('view-wrapper');
const imageFrame = document.getElementById('image-frame');
const imgOriginal = document.getElementById('img-original');
const imgSimulated = document.getElementById('img-simulated');
const simulatedOverlay = document.getElementById('simulated-overlay');
const sliderHandle = document.getElementById('slider-handle');
const conditionDesc = document.getElementById('condition-desc');
const zoomRange = document.getElementById('zoom-range');
const zoomLabel = document.getElementById('zoom-label');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');
const metaResolution = document.getElementById('meta-resolution');
const metaSize = document.getElementById('meta-size');
const fileInfo = document.getElementById('file-info');

// Drag & Drop Listeners
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', (e) => {
  if (e.target.files.length) processFile(e.target.files[0]);
});

// Structural Processing Pipeline with Error Handling & File Size Cap
function processFile(file) {
  if (!file.type.match('image.*')) {
    showNotification('Please provide a valid image asset (PNG, JPG, WebP).', true);
    return;
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    showNotification(`File is too large (${Math.round(file.size / (1024 * 1024))}MB). Please upload an image under 5MB to preserve performance.`, true);
    return;
  }

  // Visual visual feedback for ingestion loading
  conditionDesc.textContent = "Processing image data vectors...";
  
  const reader = new FileReader();
  
  reader.onerror = () => {
    showNotification('Failed to read the file asset. It may be corrupted.', true);
    conditionDesc.textContent = descriptions[state.currentMode];
  };

  reader.onload = (e) => {
    const url = e.target.result;
    imgOriginal.src = url;
    imgSimulated.src = url;

    metaSize.textContent = `${Math.round(file.size / 1024)} KB`;
    
    const tempImg = new Image();
    tempImg.onerror = () => {
      showNotification('Error rendering image dimensions. File may contain invalid structure data.', true);
      resetApplicationState();
    };

    tempImg.onload = function() {
      metaResolution.textContent = `${this.width} x ${this.height}`;
      fileInfo.classList.remove('hidden');
      state.hasImage = true;
      downloadBtn.disabled = false;
      alignOverlayDimensions();
      conditionDesc.textContent = descriptions[state.currentMode];
    };
    tempImg.src = url;
  };
  reader.readAsDataURL(file);
}

// Deficiency Switching Configuration
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    const target = e.currentTarget;
    target.classList.add('active');
    
    state.currentMode = target.dataset.mode;
    conditionDesc.textContent = descriptions[state.currentMode];
    
    viewWrapper.className = `view-wrapper ${state.layout}-mode`;
    if (state.currentMode !== 'normal') {
      viewWrapper.classList.add(`filter-${state.currentMode}`);
    }
  });
});

// Layout Manager Switching WITH FIXED specificity reset
document.querySelectorAll('.layout-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.layout-btn').forEach(b => b.classList.remove('active'));
    const target = e.currentTarget;
    target.classList.add('active');
    
    state.layout = target.dataset.layout;
    viewWrapper.className = `view-wrapper ${state.layout}-mode`;
    if (state.currentMode !== 'normal') {
      viewWrapper.classList.add(`filter-${state.currentMode}`);
    }
    
    // FIX: Clear layout properties entirely, including the stale inline image width 
    simulatedOverlay.style.width = '';
    sliderHandle.style.left = '';
    imgSimulated.style.width = ''; 
    
    if (state.layout === 'split') {
      updateSplitSlider(state.sliderPercentage);
    }
  });
});

// Dynamic Precision Split Slider Logic
sliderHandle.addEventListener('mousedown', () => state.isDraggingSlider = true);
window.addEventListener('mouseup', () => state.isDraggingSlider = false);
window.addEventListener('mousemove', (e) => {
  if (!state.isDraggingSlider || state.layout !== 'split') return;
  
  const rect = imageFrame.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  let percentage = (offsetX / rect.width) * 100;
  
  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;
  
  state.sliderPercentage = percentage;
  updateSplitSlider(percentage);
});

// Touch Devices Interface Support
sliderHandle.addEventListener('touchstart', () => state.isDraggingSlider = true);
window.addEventListener('touchend', () => state.isDraggingSlider = false);
window.addEventListener('touchmove', (e) => {
  if (!state.isDraggingSlider || state.layout !== 'split' || !e.touches.length) return;
  
  const rect = imageFrame.getBoundingClientRect();
  const offsetX = e.touches[0].clientX - rect.left;
  let percentage = (offsetX / rect.width) * 100;
  
  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;
  
  state.sliderPercentage = percentage;
  updateSplitSlider(percentage);
});

function updateSplitSlider(percentage) {
  simulatedOverlay.style.width = `${percentage}%`;
  sliderHandle.style.left = `${percentage}%`;
  alignOverlayDimensions();
}

function alignOverlayDimensions() {
  if (state.layout !== 'split') return;
  const rect = imageFrame.getBoundingClientRect();
  imgSimulated.style.width = `${rect.width}px`;
}

// Window resizing tracking hooks to maintain alignment
window.addEventListener('resize', alignOverlayDimensions);

// Zoom Operations
zoomRange.addEventListener('input', (e) => {
  state.zoom = e.target.value;
  zoomLabel.textContent = `${state.zoom}%`;
  imageFrame.style.transform = `scale(${state.zoom / 100})`;
});

// Global Application State Reset Container
function resetApplicationState() {
  const fallbackSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'%3E%3Crect width='100%25' height='100%25' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='20'%3EPlease upload or drop an image to start simulation%3C/text%3E%3C/svg%3E";
  imgOriginal.src = fallbackSvg;
  imgSimulated.src = fallbackSvg;
  fileInfo.classList.add('hidden');
  state.hasImage = false;
  downloadBtn.disabled = true;
  
  zoomRange.value = 100;
  zoomLabel.textContent = "100%";
  imageFrame.style.transform = 'scale(1)';
  state.sliderPercentage = 50;
  
  simulatedOverlay.style.width = '';
  sliderHandle.style.left = '';
  imgSimulated.style.width = '';
  
  if(state.layout === 'split') updateSplitSlider(50);
}

resetBtn.addEventListener('click', resetApplicationState);

// Bake Dynamic Render State to Canvas Context for Download Execution
downloadBtn.addEventListener('click', () => {
  if (!state.hasImage) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = imgOriginal.naturalWidth;
  canvas.height = imgOriginal.naturalHeight;
  
  const filterString = getComputedStyle(imgSimulated).filter;
  ctx.filter = filterString;
  
  // Quick safety log check for Safari cross-compiling evaluation issues
  if (filterString === 'none' || filterString === '') {
    console.warn("Canvas filter resolution returned blank. Fallback calculations may look flat on WebKit frameworks.");
  }
  
  ctx.drawImage(imgOriginal, 0, 0);
  
  const link = document.createElement('a');
  link.download = `simulated-${state.currentMode}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// Simple notification framework to communicate file constraint breaches
// Non-blocking toast notification framework
function showNotification(message, isError = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'toast-error' : ''}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Smoothly trigger the exit animation before removing the element
  const dismissalDuration = 4000; 
  const animationDuration = 300;

  setTimeout(() => {
    toast.classList.add('toast-fade-out');
    setTimeout(() => {
      toast.remove();
    }, animationDuration);
  }, dismissalDuration);
}

// Global Keyboard Shortcut Bindings
window.addEventListener('keydown', (e) => {
  const shortcuts = { '1': 'normal', '2': 'protanopia', '3': 'deuteranopia', '4': 'tritanopia', '5': 'achromatopsia' };
  if (shortcuts[e.key]) {
    const targetBtn = document.querySelector(`[data-mode="${shortcuts[e.key]}"]`);
    if (targetBtn) targetBtn.click();
  }
});