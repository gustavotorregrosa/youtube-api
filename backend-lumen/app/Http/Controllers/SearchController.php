<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

    public function videos(Request $request){

        $searchQuery = $request->input('qString');
        $pageToken = $request->input('pageToken') ?? null;
        $content = $this->youtubeService->videos($searchQuery, $pageToken);
       
        return response()->json([
            'nextPageToken' => $content->nextPageToken,
            'prevPageToken' => $content->prevPageToken ?? null,
            'pageInfo' => $content->pageInfo,
            'videos' =>  $content->items,
        ]);
    }
}
