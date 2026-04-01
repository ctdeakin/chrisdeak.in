(function () {
  function getFrames() {
    try {
      return JSON.parse(sessionStorage.getItem('cd-frames') || '[]');
    } catch (e) {
      return [];
    }
  }

  function addFrame() {
    var frames = getFrames();
    var x = (Math.random() * 10 - 5).toFixed(2) + '%';
    var y = (Math.random() * 10 - 5).toFixed(2) + '%';
    frames.unshift({ x: x, y: y });
    try {
      sessionStorage.setItem('cd-frames', JSON.stringify(frames));
    } catch (e) {}
    return frames;
  }

  function render() {
    var content = document.getElementById('page-content');
    var container = document.querySelector('.container');
    if (!content || !container) return;

    var frames = addFrame();
    content.style.display = '';

    // Wrap content in frames.
    // frames[0] is newest (innermost), frames[last] is oldest (outermost).
    // Loop from 0 upward so each iteration wraps the previous result,
    // ending with the oldest frame on the outside.
    var node = content;
    for (var i = 0; i < frames.length; i++) {
      var div = document.createElement('div');
      div.className = 'card frame';
      div.style.position = 'absolute';
      div.style.left = frames[i].x;
      div.style.top = frames[i].y;
      div.appendChild(node);
      node = div;
    }

    container.appendChild(node);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
