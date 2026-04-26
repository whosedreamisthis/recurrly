import { useEffect, useRef } from 'react';
import { FlatList, Platform } from 'react-native';

export const useWebScroll = () => {
	const flatListRef = useRef<FlatList>(null);
	const containerRef = useRef<HTMLElement | null>(null);
	const dragStartY = useRef(0);
	const scrollStartY = useRef(0);
	const dragDistanceRef = useRef(0);
	const DRAG_THRESHOLD = 10; // pixels - if drag > 10px, it's a drag not a click

	useEffect(() => {
		// Only apply web scroll behavior on web platform
		if (Platform.OS !== 'web') return;

		// Find scrollable container with better detection
		const findScrollableContainer = (): HTMLElement | null => {
			// First try to find the main scrollable div (usually from Expo)
			const allElements = document.querySelectorAll('*');

			for (let element of allElements) {
				const el = element as HTMLElement;
				const computed = window.getComputedStyle(el);
				const overflowY = computed.overflowY;
				const scrollHeight = el.scrollHeight;
				const clientHeight = el.clientHeight;

				// Check if element can scroll and overflow is set
				if (
					scrollHeight > clientHeight &&
					(overflowY === 'scroll' ||
						overflowY === 'auto' ||
						el.style.overflowY === 'scroll' ||
						el.style.overflowY === 'auto')
				) {
					console.log('Found scrollable container:', el);
					return el;
				}
			}

			// Fallback: try the body or html
			if (document.body.scrollHeight > document.body.clientHeight) {
				console.log('Using body as scrollable container');
				return document.body;
			}

			console.log('No scrollable container found');
			return null;
		};

		// Find container immediately
		containerRef.current = findScrollableContainer();

		// Handle mouse down to start tracking drag
		const handleMouseDown = (e: MouseEvent) => {
			dragStartY.current = e.clientY;
			scrollStartY.current = containerRef.current?.scrollTop || 0;
			dragDistanceRef.current = 0;
			document.body.style.userSelect = 'none';
		};

		// Handle mouse movement to drag-scroll
		const handleMouseMove = (e: MouseEvent) => {
			if (dragStartY.current === 0 || !containerRef.current) return;

			// Calculate how far the mouse has moved
			const delta = e.clientY - dragStartY.current;
			dragDistanceRef.current = Math.abs(delta);

			// Scroll inversely - drag down = scroll down (positive delta = negative scroll)
			containerRef.current.scrollTop = scrollStartY.current - delta;
		};

		// Prevent click events after dragging
		const handleClickCapture = (e: Event) => {
			// If we dragged more than threshold, prevent the click
			if (dragDistanceRef.current > DRAG_THRESHOLD) {
				e.preventDefault();
				e.stopPropagation();
				dragDistanceRef.current = 0;
			}
		};

		// Re-enable text selection on mouse up
		const handleMouseUp = () => {
			dragStartY.current = 0;
			document.body.style.userSelect = 'auto';
		};

		const handleMouseLeave = () => {
			dragStartY.current = 0;
			document.body.style.userSelect = 'auto';
		};

		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('mouseleave', handleMouseLeave);
		// Use capture phase to intercept clicks before they reach handlers
		document.addEventListener('click', handleClickCapture, true);

		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('click', handleClickCapture, true);
			document.body.style.userSelect = 'auto';
		};
	}, []);

	return flatListRef;
};
