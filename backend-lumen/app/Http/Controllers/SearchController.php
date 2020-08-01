<?php

namespace App\Http\Controllers;

use App\Services\YoutubeRequestService;


class SearchController extends Controller
{


    protected $youtubeService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(YoutubeRequestService $youtubeService)
    {
        $this->youtubeService = $youtubeService;
    }

    public function videos($searchQuery){

        $content = $this->youtubeService->videos($searchQuery);
       
        return response()->json([
            'nextPageToken' => $content->nextPageToken,
            'pageInfo' => $content->pageInfo,
            'videos' =>  $content->items,
        ]);
    }
}
