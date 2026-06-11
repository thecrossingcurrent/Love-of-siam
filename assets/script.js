(function () {
  var copyButton = document.getElementById('copy-link');

  if (!copyButton) {
    return;
  }

  copyButton.addEventListener('click', function () {
    var url = window.location.href;
    var label = copyButton.querySelector('span');
    var originalText = label ? label.textContent : '';

    var done = function (success) {
      if (!label) {
        return;
      }
      label.textContent = success ? 'Đã sao chép!' : 'Không thể sao chép';
      copyButton.classList.toggle('is-copied', success);
      window.setTimeout(function () {
        label.textContent = originalText;
        copyButton.classList.remove('is-copied');
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        done(true);
      }, function () {
        done(false);
      });
    } else {
      var textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        done(true);
      } catch (err) {
        done(false);
      }
      document.body.removeChild(textarea);
    }
  });
})();
