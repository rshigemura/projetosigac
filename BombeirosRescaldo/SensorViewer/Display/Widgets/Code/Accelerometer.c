/*+ FILE DESCRIPTION -------------------------------------------------------
 DESCRIPTION       : Accelerometer (works only on tablets) 
 VERSION           : $Revision: 16884 $
 MODIFICATION DATE : $Date: 2015-04-27 16:46:17 +0200 (lun., 27 avr. 2015) $
 COPYRIGHT (C)     : 2008-2011 by Esterel Technologies.
---------------------------------------------------------------------------- +*/

#include "sgl_types.h"
#include "sgl.h"
#include "imported_sensors.h"

#ifndef accelerometer_event
sdy_accelerometer_event_t accelerometer_event = {0,0.0,0.0,0.0};
#endif

void accelerometer(SGLfloat (*x), SGLfloat (*y), SGLfloat (*z)){
	if (x != SGL_NULL) {
		*x = accelerometer_event.x;
	}
	if (y != SGL_NULL) {
		*y = accelerometer_event.y;
	}
	if (z != SGL_NULL) {
		*z = accelerometer_event.z;
	}
}
