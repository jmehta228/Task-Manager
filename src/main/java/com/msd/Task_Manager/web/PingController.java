package com.msd.Task_Manager.web;

import org.springframework.web.bind.annotation.*;

@RestController
public class PingController {
    @GetMapping("/ping")
    public String ping() { return "ok"; }
}
