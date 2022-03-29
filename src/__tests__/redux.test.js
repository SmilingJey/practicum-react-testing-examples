import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../store/auth/actions";
import reducer from "../store/auth/reducer";
import mestoApi from "../utils/mesto-api";
import * as authApi from "../utils/auth-api";

describe("Redux store and actions", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ result: "OK" }),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      authChecking: true,
      data: null,
      loginError: "",
      loginSending: false,
      registerError: "",
      registerSending: undefined,
    });
  });

  test("should return state with loginError after login error action", () => {
    const errorMessage = "Who are you?";
    expect(
      reducer(undefined, {
        type: actions.ActionTypes.SET_LOGIN_SEND_ERROR,
        payload: errorMessage,
      })
    ).toEqual({
      authChecking: true,
      data: null,
      loginError: errorMessage,
      loginSending: false,
      registerError: "",
      registerSending: false,
    });
  });

  test("should create SET_REGISTER_SENDING action with payload true", () => {
    const regsend = actions.setRegisterSending(true);
    expect(regsend).toEqual({
      type: actions.ActionTypes.SET_REGISTER_SENDING,
      payload: true,
    });
  });

  test("should fire 3 actions after register is dispatched", () => {
    const middlewares = [thunk.withExtraArgument({ mestoApi, authApi })];
    const mockStore = configureMockStore(middlewares);

    const expectedActions = [
      { type: actions.ActionTypes.SET_REGISTER_SENDING, payload: true },
      { type: actions.ActionTypes.SET_REGISTER_SEND_ERROR, payload: "" },
      { type: actions.ActionTypes.SET_REGISTER_SENDING, payload: false },
    ];
    const store = mockStore({ data: null });

    return store.dispatch(actions.register({ email: "email", password: "password" }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
