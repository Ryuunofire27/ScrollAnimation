'use strict';

var getCurrentPosition = function getCurrentPosition(scrollContainerElement) {
  return scrollContainerElement.scrollTop;
};

var getElementTopPosition = function getElementTopPosition(elementToScroll, scrollContainerElement) {
  return elementToScroll.getBoundingClientRect().top + getCurrentPosition(scrollContainerElement);
};

var getAddingTop = function getAddingTop(differencePosition, time) {
  var differencePositionByTime = Math.ceil(differencePosition / time);
  if (differencePositionByTime === 0) {
    return differencePosition > 0 ? 1 : -1;
  }
  return differencePositionByTime;
};

var animateScroll = function animateScroll(elementToScroll, time, addingPositionHeader, scrollContainerElement) {
  var elementTopPosition = getElementTopPosition(elementToScroll, scrollContainerElement) - addingPositionHeader;
  var currentTopPosition = getCurrentPosition(scrollContainerElement);
  var differencePosition = elementTopPosition - currentTopPosition;
  var addingTop = getAddingTop(differencePosition, time);
  var animateInterval = setInterval(function () {
    if (addingTop > 0) {
      if (getCurrentPosition(scrollContainerElement) >= elementTopPosition - addingTop / 2 || scrollContainerElement.scrollTopMax <= scrollContainerElement.scrollTop + 10) {
        clearInterval(animateInterval);
      }
    } else {
      if (getCurrentPosition(scrollContainerElement) <= elementTopPosition - addingTop / 2) {
        clearInterval(animateInterval);
      }
    }

    scrollContainerElement.scrollBy(0, addingTop);
  }, 1);
};

var animateScrollEvent = function animateScrollEvent(element, time, addingPositionHeader, scrollContainerElement) {
  element.addEventListener('click', function (e) {
    e.preventDefault();

    var id = element.firstElementChild.getAttribute('href').slice(1);
    var elementToScroll = document.getElementById(id);
    animateScroll(elementToScroll, time, addingPositionHeader, scrollContainerElement);
  });
};

var scrollAnimation = function scrollAnimation(listElements, delay) {
  var addingHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var scrollContainerElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.documentElement;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = listElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var element = _step.value;

      animateScrollEvent(element, delay, addingHeight, scrollContainerElement);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};