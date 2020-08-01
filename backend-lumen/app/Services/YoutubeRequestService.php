<?php

namespace App\Services;

class YoutubeRequestService {


    protected $tokenService;

    public function __construct(TokenService $tokenService)
    {
        $this->tokenService = $tokenService;
    }


    public function generateRequest(){
        return $this->tokenService->getValidToken();
    }

    public function videos($queryString){

        $token =  $this->tokenService->getValidToken();
        $token = "Bearer " . $token;
        $headers = [
            "Authorization: ".$token,
            "Accept: application/json"
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=".$queryString);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $output = curl_exec($ch);
        $output = json_decode($output);
        curl_close($ch);
        return $output;
    }
    

}