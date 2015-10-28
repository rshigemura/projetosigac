/*******************************************************************
 * SQL-GAC: SQL Client for the SI-GAC project.
 * 
 * It contains operations for making SQL operations.
 * 
 * Copyright (c) 2015    Fernando Fonseca <fetofs@gmail.com> 
 * Copyright (c) 2015    Rodrigo Roim <roim.rodrigo@gmail.com> 
 *  
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 *******************************************************************/

// Include <sqlite3.h>
#include <sqlite3.h>

// Include <string.h>
#include <string.h>

// Include "../librest/httpclient.h"
#include "../librest/httpclient.h"

// Implement the sendSqlRequest function.
char* sendSqlRequest(const char* sqlOperation) {
	// Declare the URL char array.
	char url[1515];

	// Set the first character to be '\0'.
	url[0] = '\0';

	// Set the base URL to "http://www.google.com/query" by using strcat.
	strcat(url, "http://powerful-forest-9086.herokuapp.com/");

	// Append the query string "?q=" by using strcat.
	strcat(url, "?q=");

	// Append the sqlOperation string.
	strcat(url, sqlOperation);

	// Prepare an HTTP_REQUEST.
	HTTP_REQUEST req;

	// Set the request method to HTTP_GET.
	req.method = HTTP_GET;

	// Set the request url to url.
	req.url = url;

	// Return the sent request buffer.
	return sendRequest(&req)->buffer;
}

// Implement the sendHttpSqlRequest function.
char* sendHttpSqlRequest(const char* sqlOperation) {
	// Declare the URL char array.
	char url[1515];

	// Set the first character to be '\0'.
	url[0] = '\0';

	// Set the base URL to "http://www.google.com/query" by using strcat.
	strcat(url, "http://powerful-forest-9086.herokuapp.com/");

	// Append the query string "?q=" by using strcat.
	strcat(url, "?q=");

	// Append the sqlOperation string.
	strcat(url, sqlOperation);

	// Prepare an HTTP_REQUEST.
	HTTP_REQUEST req;

	// Set the request method to HTTP_GET.
	req.method = HTTP_GET;

	// Set the request url to url.
	req.url = url;

	// Return the sent request buffer.
	return sendRequest(&req)->buffer;
}
