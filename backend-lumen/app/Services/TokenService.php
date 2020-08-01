<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Google_Client;
use Google_Service_YouTube;

class TokenService {

    public function getValidToken(){
        if ($this->isTokenExpired($this->getTokenFromFile()->date)){
            $this->updateToken();    
        }

        return $this->getTokenFromFile()->token;
       
    }

    public function getTokenFromFile(){
        return json_decode(Storage::get('token.txt'));
    }

    private function isTokenExpired($date){
        $tokenDate = strtotime($date);
        $now = strtotime(date('Y-m-d H:i:s'));
        $tokenValidity = 10 * 60;
        if(($now - $tokenDate) > $tokenValidity){
            return true;
        }

        return false;
    }


    public function updateToken(){
        $content = [
            'date' => date('Y-m-d H:i:s'),
            'token' => $this->getNewToken()
        ];
        Storage::put('token.txt', json_encode($content));
    }
    
    private function getNewToken(){
        $myToken = null;
        $myClient = new Google_Client;
        $myClient->useApplicationDefaultCredentials();
        $myClient->addScope(Google_Service_YouTube::YOUTUBE_FORCE_SSL);
        $tokenCallback = function ($cacheKey, $accessToken) use (&$myToken){
            $myToken = $accessToken;
          };
        $myClient->setTokenCallback($tokenCallback);
        $httpClient = $myClient->authorize();
        $response = $httpClient->get('https://www.googleapis.com/auth/youtube');
        return $myToken;
      
    }


}