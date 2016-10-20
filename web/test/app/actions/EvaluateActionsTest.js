import expect from "must";
import sinon from "sinon";

import { FULLY_CONNECTED_EVALUATED, evaluateFullyConnected } from "../../../app/actions/EvaluateActions";

describe("EvaluateActions", function() {

	var server;

	before(function () { server = sinon.fakeServer.create(); });

	after(function () { server.restore(); });

	it("fetches evaluation from the the /api/mnist/fully_connected resource and dispatches an action", function() {
		const dispatchSpy = sinon.spy();

		evaluateFullyConnected()(dispatchSpy);

		const evaluation = {
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
		};

		server.requests[0].respond(
        	200,
        	{ "Content-Type": "application/json" },
        	JSON.stringify(evaluation)
    	);

		expect(server.requests.length).to.eql(1);
		expect(server.requests[0].url).to.eql('/api/mnist/fully_connected');

		expect(dispatchSpy.firstCall.args[0]).to.eql({
			type: FULLY_CONNECTED_EVALUATED,
			payload: evaluation
		});
	});
});
