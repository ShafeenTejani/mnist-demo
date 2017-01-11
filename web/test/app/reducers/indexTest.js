//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
import expect from "must";

import reducer from "../../../app/reducers/index";
import { FULLY_CONNECTED_EVALUATED } from "../../../app/actions/EvaluateActions";

describe("ReducersTest", function() {
	it("updates the fully_connected state when receiving a FULLY_CONNECTED_EVALUATED action", function(){
		const initialState = {
			fully_connected: {}
		};

		const action = {
			type: FULLY_CONNECTED_EVALUATED,
			payload: {
				results: {
					0: 0.1,
					1: 0.1,
					2: 0.3,
					3: 0.05,
					4: 0.05,
					5: 0.1,
					6: 0.1,
					7: 0.05,
					8: 0.05,
					9: 0.1
				}
			}
		};

		const state = reducer(initialState, action);

		expect(state.fully_connected).to.eql({
			results: {
				0: 0.1,
				1: 0.1,
				2: 0.3,
				3: 0.05,
				4: 0.05,
				5: 0.1,
				6: 0.1,
				7: 0.05,
				8: 0.05,
				9: 0.1
			}
		});

		expect(initialState).to.eql({
			fully_connected: {}
		});
	});
});
