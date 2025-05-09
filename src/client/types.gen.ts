// This file is auto-generated by @hey-api/openapi-ts

export type AddArtistToEventEventRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    artist_id: string;
};

export type ArtistDto = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    bio: string | null;
    id: string;
    sub_title: string | null;
    title: string;
};

export type CreateArtistRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    bio: string | null;
    sub_title: string | null;
    title: string;
};

export type CreateEventRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    end_time: string;
    event_type: string;
    start_time: string;
};

export type CreateUserRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    email: string;
    family_name: string | null;
    given_name: string | null;
};

export type CreateUserResponseBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    session: SessionDto;
    user: UserDto;
};

export type DeleteTimeslotMarkerRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    timeslot_marker_id: string;
};

export type ErrorDetail = {
    /**
     * Where the error occurred, e.g. 'body.items[3].tags' or 'path.thing-id'
     */
    location?: string;
    /**
     * Error message text
     */
    message?: string;
    /**
     * The value at the given location
     */
    value?: unknown;
};

export type ErrorModel = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    /**
     * A human-readable explanation specific to this occurrence of the problem.
     */
    detail?: string;
    /**
     * Optional list of individual error details
     */
    errors?: Array<ErrorDetail> | null;
    /**
     * A URI reference that identifies the specific occurrence of the problem.
     */
    instance?: string;
    /**
     * HTTP status code
     */
    status?: number;
    /**
     * A short, human-readable summary of the problem type. This value should not change between occurrences of the error.
     */
    title?: string;
    /**
     * A URI reference to human-readable documentation for the error.
     */
    type?: string;
};

export type EventDto = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    end_time: string;
    event_type: string;
    id: string;
    is_current: boolean;
    start_time: string;
    time_markers: Array<TimesMarkerDto> | null;
    time_slots: Array<TimeslotDto> | null;
};

export type ListenForChangeEventResponse = {
    body: EventDto;
};

export type RemoveArtistFromEventEventRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    artist_id: string;
};

export type SessionDto = {
    expires_at: string;
    token: string;
};

export type SetNowPlayingRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    index: number;
};

export type SetSortOrderRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    after_slot_id?: string;
    before_slot_id?: string;
    current_slot_id: string;
};

export type SetTimeslotMarkerRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    slot_index: number;
    time_display: string;
};

export type TimesMarkerDto = {
    display: string;
    id: string;
    slot_index: number;
    type: string;
};

export type TimeslotDto = {
    artist: ArtistDto;
    id: string;
    song_count: number;
    time_display: string;
};

export type UpdateArtistRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    bio: string | null;
    sub_title: string | null;
    title: string;
};

export type UpdateEventRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    end_time: string;
    event_type: string;
    start_time: string;
};

export type UpdateTimeSlotRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    song_count: number;
};

export type UpdateUserRequestBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    email: string;
    family_name: string | null;
    given_name: string | null;
    handle: string;
};

export type UpdateUserResponseBody = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    user: UserDto;
};

export type UserDto = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    email: string;
    family_name: string | null;
    given_name: string | null;
    id: string;
};

export type CreateArtistData = {
    body: CreateArtistRequestBody;
    path?: never;
    query?: never;
    url: '/artist';
};

export type CreateArtistErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type CreateArtistError = CreateArtistErrors[keyof CreateArtistErrors];

export type CreateArtistResponses = {
    /**
     * OK
     */
    200: ArtistDto;
};

export type CreateArtistResponse = CreateArtistResponses[keyof CreateArtistResponses];

export type DeleteArtistData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/artist/{id}';
};

export type DeleteArtistErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type DeleteArtistError = DeleteArtistErrors[keyof DeleteArtistErrors];

export type DeleteArtistResponses = {
    /**
     * OK
     */
    200: ArtistDto;
};

export type DeleteArtistResponse = DeleteArtistResponses[keyof DeleteArtistResponses];

export type GetArtistData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/artist/{id}';
};

export type GetArtistErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type GetArtistError = GetArtistErrors[keyof GetArtistErrors];

export type GetArtistResponses = {
    /**
     * OK
     */
    200: ArtistDto;
};

export type GetArtistResponse = GetArtistResponses[keyof GetArtistResponses];

export type UpdateArtistData = {
    body: UpdateArtistRequestBody;
    path: {
        id: string;
    };
    query?: never;
    url: '/artist/{id}';
};

export type UpdateArtistErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type UpdateArtistError = UpdateArtistErrors[keyof UpdateArtistErrors];

export type UpdateArtistResponses = {
    /**
     * OK
     */
    200: ArtistDto;
};

export type UpdateArtistResponse = UpdateArtistResponses[keyof UpdateArtistResponses];

export type GetAllArtistsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/artists';
};

export type GetAllArtistsErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type GetAllArtistsError = GetAllArtistsErrors[keyof GetAllArtistsErrors];

export type GetAllArtistsResponses = {
    /**
     * OK
     */
    200: Array<ArtistDto> | null;
};

export type GetAllArtistsResponse = GetAllArtistsResponses[keyof GetAllArtistsResponses];

export type GetArtistsByTitleData = {
    body?: never;
    path?: never;
    query?: {
        title?: string;
    };
    url: '/artists/search';
};

export type GetArtistsByTitleErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type GetArtistsByTitleError = GetArtistsByTitleErrors[keyof GetArtistsByTitleErrors];

export type GetArtistsByTitleResponses = {
    /**
     * OK
     */
    200: Array<ArtistDto> | null;
};

export type GetArtistsByTitleResponse = GetArtistsByTitleResponses[keyof GetArtistsByTitleResponses];

export type CreateEventData = {
    body: CreateEventRequestBody;
    path?: never;
    query?: never;
    url: '/event';
};

export type CreateEventErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type CreateEventError = CreateEventErrors[keyof CreateEventErrors];

export type CreateEventResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type CreateEventResponse = CreateEventResponses[keyof CreateEventResponses];

export type GetCurrentEventData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/event/now';
};

export type GetCurrentEventErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type GetCurrentEventError = GetCurrentEventErrors[keyof GetCurrentEventErrors];

export type GetCurrentEventResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type GetCurrentEventResponse = GetCurrentEventResponses[keyof GetCurrentEventResponses];

export type AddArtistToEventData = {
    body: AddArtistToEventEventRequestBody;
    path: {
        event_id: string;
    };
    query?: never;
    url: '/event/{event_id}/add';
};

export type AddArtistToEventErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type AddArtistToEventError = AddArtistToEventErrors[keyof AddArtistToEventErrors];

export type AddArtistToEventResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type AddArtistToEventResponse = AddArtistToEventResponses[keyof AddArtistToEventResponses];

export type SetNowPlayingData = {
    body: SetNowPlayingRequestBody;
    path: {
        event_id: string;
    };
    query?: never;
    url: '/event/{event_id}/now-playing';
};

export type SetNowPlayingErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type SetNowPlayingError = SetNowPlayingErrors[keyof SetNowPlayingErrors];

export type SetNowPlayingResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type SetNowPlayingResponse = SetNowPlayingResponses[keyof SetNowPlayingResponses];

export type RemoveArtistFromEventData = {
    body: RemoveArtistFromEventEventRequestBody;
    path: {
        event_id: string;
    };
    query?: never;
    url: '/event/{event_id}/remove';
};

export type RemoveArtistFromEventErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type RemoveArtistFromEventError = RemoveArtistFromEventErrors[keyof RemoveArtistFromEventErrors];

export type RemoveArtistFromEventResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type RemoveArtistFromEventResponse = RemoveArtistFromEventResponses[keyof RemoveArtistFromEventResponses];

export type SetSortOrderData = {
    body: SetSortOrderRequestBody;
    path: {
        event_id: string;
    };
    query?: never;
    url: '/event/{event_id}/sort';
};

export type SetSortOrderErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type SetSortOrderError = SetSortOrderErrors[keyof SetSortOrderErrors];

export type SetSortOrderResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type SetSortOrderResponse = SetSortOrderResponses[keyof SetSortOrderResponses];

export type DeleteTimeslotMarkerData = {
    body: DeleteTimeslotMarkerRequestBody;
    path: {
        event_id: string;
    };
    query?: never;
    url: '/event/{event_id}/timeslot/marker';
};

export type DeleteTimeslotMarkerErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type DeleteTimeslotMarkerError = DeleteTimeslotMarkerErrors[keyof DeleteTimeslotMarkerErrors];

export type DeleteTimeslotMarkerResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type DeleteTimeslotMarkerResponse = DeleteTimeslotMarkerResponses[keyof DeleteTimeslotMarkerResponses];

export type SetTimeslotMarkerData = {
    body: SetTimeslotMarkerRequestBody;
    path: {
        event_id: string;
    };
    query?: never;
    url: '/event/{event_id}/timeslot/marker';
};

export type SetTimeslotMarkerErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type SetTimeslotMarkerError = SetTimeslotMarkerErrors[keyof SetTimeslotMarkerErrors];

export type SetTimeslotMarkerResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type SetTimeslotMarkerResponse = SetTimeslotMarkerResponses[keyof SetTimeslotMarkerResponses];

export type UpdateTimeslotData = {
    body: UpdateTimeSlotRequestBody;
    path: {
        event_id: string;
        timeslot_id: string;
    };
    query?: never;
    url: '/event/{event_id}/timeslot/{timeslot_id}';
};

export type UpdateTimeslotErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type UpdateTimeslotError = UpdateTimeslotErrors[keyof UpdateTimeslotErrors];

export type UpdateTimeslotResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type UpdateTimeslotResponse = UpdateTimeslotResponses[keyof UpdateTimeslotResponses];

export type DeleteEventData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/event/{id}';
};

export type DeleteEventErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type DeleteEventError = DeleteEventErrors[keyof DeleteEventErrors];

export type DeleteEventResponses = {
    /**
     * OK
     */
    200: string;
};

export type DeleteEventResponse = DeleteEventResponses[keyof DeleteEventResponses];

export type GetEventData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/event/{id}';
};

export type GetEventErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type GetEventError = GetEventErrors[keyof GetEventErrors];

export type GetEventResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type GetEventResponse = GetEventResponses[keyof GetEventResponses];

export type UpdateEventData = {
    body: UpdateEventRequestBody;
    path: {
        id: string;
    };
    query?: never;
    url: '/event/{id}';
};

export type UpdateEventErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type UpdateEventError = UpdateEventErrors[keyof UpdateEventErrors];

export type UpdateEventResponses = {
    /**
     * OK
     */
    200: EventDto;
};

export type UpdateEventResponse = UpdateEventResponses[keyof UpdateEventResponses];

export type GetEventsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/events';
};

export type GetEventsErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type GetEventsError = GetEventsErrors[keyof GetEventsErrors];

export type GetEventsResponses = {
    /**
     * OK
     */
    200: Array<EventDto> | null;
};

export type GetEventsResponse = GetEventsResponses[keyof GetEventsResponses];

export type SseData = {
    body?: never;
    path: {
        event_id: string;
    };
    query?: never;
    url: '/sse/{event_id}';
};

export type SseErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type SseError = SseErrors[keyof SseErrors];

export type SseResponses = {
    /**
     * Each oneOf object in the array represents one possible Server Sent Events (SSE) message, serialized as UTF-8 text according to the SSE specification.
     */
    200: Array<{
        data: ListenForChangeEventResponse;
        /**
         * The event name.
         */
        event?: 'message';
        /**
         * The event ID.
         */
        id?: number;
        /**
         * The retry time in milliseconds.
         */
        retry?: number;
    }>;
};

export type SseResponse = SseResponses[keyof SseResponses];

export type CreateUserData = {
    body: CreateUserRequestBody;
    path?: never;
    query?: never;
    url: '/user';
};

export type CreateUserErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type CreateUserError = CreateUserErrors[keyof CreateUserErrors];

export type CreateUserResponses = {
    /**
     * OK
     */
    200: CreateUserResponseBody;
};

export type CreateUserResponse = CreateUserResponses[keyof CreateUserResponses];

export type GetUserEmailData = {
    body?: never;
    path: {
        email: string;
    };
    query?: never;
    url: '/user/email/{email}';
};

export type GetUserEmailErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type GetUserEmailError = GetUserEmailErrors[keyof GetUserEmailErrors];

export type GetUserEmailResponses = {
    /**
     * OK
     */
    200: UserDto;
};

export type GetUserEmailResponse = GetUserEmailResponses[keyof GetUserEmailResponses];

export type GetUserData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/user/{id}';
};

export type GetUserErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type GetUserError = GetUserErrors[keyof GetUserErrors];

export type GetUserResponses = {
    /**
     * OK
     */
    200: UserDto;
};

export type GetUserResponse = GetUserResponses[keyof GetUserResponses];

export type UpdateUserData = {
    body: UpdateUserRequestBody;
    path: {
        id: string;
    };
    query?: never;
    url: '/user/{id}';
};

export type UpdateUserErrors = {
    /**
     * Error
     */
    default: ErrorModel;
};

export type UpdateUserError = UpdateUserErrors[keyof UpdateUserErrors];

export type UpdateUserResponses = {
    /**
     * OK
     */
    200: UpdateUserResponseBody;
};

export type UpdateUserResponse = UpdateUserResponses[keyof UpdateUserResponses];

export type ClientOptions = {
    baseUrl: 'http://localhost:3001' | (string & {});
};