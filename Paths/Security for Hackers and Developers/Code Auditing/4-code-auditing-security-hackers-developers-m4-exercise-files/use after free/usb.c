static void camera_disconnect(struct usb_device *dev, void *ptr)
{
	struct camera_state *camera = (struct camera_state *) ptr;
	int subminor = camera->subminor;

	down (&state_table_mutex);
	down (&camera->sem);

/* If camera’s not opened, we can clean up right away.
* Else apps see a disconnect on next I/O; the release cleans.
*/

	if (!camera->buf) {
		minor_data [subminor] = NULL;
		kfree (camera);
	} else
		camera->dev = NULL;

	info ("USB Camera #%d disconnected", subminor);
	usb_dec_dev_use (dev);

	up(&camera->sem);
	up(&state_table_mutex);
}