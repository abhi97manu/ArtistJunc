import "@testing-library/jest-dom";
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from "axios";
import React from "react";
import { getAlbumSongs } from '../ApiData';

// Mock axios
jest.mock("axios");

// Mock import.meta.env.VITE_SERVER_URL
const SERVER_URL = 'http://mocked-server-url';
beforeAll(() => {
  // Patch import.meta.env for the test environment
  Object.defineProperty(import.meta, 'env', {
    value: { VITE_SERVER_URL: SERVER_URL },
    writable: true,
  });
});

// --- AlbumSongs component (integration point for getAlbumSongs) ---
// Minimal AlbumSongs component for integration testing
function AlbumSongs({ albumData }) {
  const [songDet, setSongDet] = React.useState();

  React.useEffect(() => {
    async function getSongsfromApi() {
      const song = await getAlbumSongs(albumData._id);
      setSongDet(song?.songs);
    }
    getSongsfromApi();
    // eslint-disable-next-line
  }, []);

  return (
    <div data-testid="albumsongs-root">
      <h1>Songs</h1>
      <div>
        {songDet &&
          songDet.map((song, index) => (
            <div key={index} data-testid="song-item">
              <p>{song.Title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

// --- TESTS ---
describe('getAlbumSongs() getAlbumSongs method', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  // --- Happy Paths ---
  describe('Happy paths', () => {
    test('renders songs returned by getAlbumSongs for a valid album id', async () => {
      // This test ensures that getAlbumSongs fetches and renders songs as expected for a valid album id.
      const mockSongs = [
        { Title: 'Song One' },
        { Title: 'Song Two' },
      ];
      axios.get.mockResolvedValueOnce({
        data: { songs: mockSongs },
      });

      const albumData = { _id: 'album123' };
      render(<AlbumSongs show={true} albumData={albumData} />);

      // Wait for the songs to be rendered
      await waitFor(() => {
        expect(screen.getByText('Song One')).toBeInTheDocument();
        expect(screen.getByText('Song Two')).toBeInTheDocument();
      });

      // Ensure axios was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(
        `${SERVER_URL}/albums/albumSong?search=album123`
      );
    });

    test('renders no songs if getAlbumSongs returns an empty songs array', async () => {
      // This test ensures that the component handles an empty songs array gracefully.
      axios.get.mockResolvedValueOnce({
        data: { songs: [] },
      });

      const albumData = { _id: 'albumEmpty' };
      render(<AlbumSongs show={true} albumData={albumData} />);

      await waitFor(() => {
        // Only the heading should be present, no song items
        expect(screen.getByText('Songs')).toBeInTheDocument();
        expect(screen.queryByTestId('song-item')).not.toBeInTheDocument();
      });
    });

    test('renders correctly when albumData._id is a number', async () => {
      // This test ensures that numeric album ids are handled correctly.
      const mockSongs = [{ Title: 'Numeric Song' }];
      axios.get.mockResolvedValueOnce({
        data: { songs: mockSongs },
      });

      const albumData = { _id: 42 };
      render(<AlbumSongs show={true} albumData={albumData} />);

      await waitFor(() => {
        expect(screen.getByText('Numeric Song')).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        `${SERVER_URL}/albums/albumSong?search=42`
      );
    });
  });

  // --- Edge Cases ---
  describe('Edge cases', () => {
    test('handles getAlbumSongs returning undefined data', async () => {
      // This test ensures that the component does not crash if getAlbumSongs returns undefined.
      axios.get.mockResolvedValueOnce({
        data: undefined,
      });

      const albumData = { _id: 'noData' };
      render(<AlbumSongs show={true} albumData={albumData} />);

      await waitFor(() => {
        expect(screen.getByText('Songs')).toBeInTheDocument();
        expect(screen.queryByTestId('song-item')).not.toBeInTheDocument();
      });
    });

    test('handles getAlbumSongs throwing an error (network failure)', async () => {
      // This test ensures that the component handles errors thrown by getAlbumSongs gracefully.
      axios.get.mockRejectedValueOnce(new Error('Network Error'));

      const albumData = { _id: 'errorAlbum' };
      render(<AlbumSongs show={true} albumData={albumData} />);

      await waitFor(() => {
        expect(screen.getByText('Songs')).toBeInTheDocument();
        expect(screen.queryByTestId('song-item')).not.toBeInTheDocument();
      });
    });

    test('handles getAlbumSongs returning null songs', async () => {
      // This test ensures that the component handles a null songs property gracefully.
      axios.get.mockResolvedValueOnce({
        data: { songs: null },
      });

      const albumData = { _id: 'nullSongs' };
      render(<AlbumSongs show={true} albumData={albumData} />);

      await waitFor(() => {
        expect(screen.getByText('Songs')).toBeInTheDocument();
        expect(screen.queryByTestId('song-item')).not.toBeInTheDocument();
      });
    });

    test('handles missing albumData._id', async () => {
      // This test ensures that the component handles missing albumData._id gracefully.
      axios.get.mockResolvedValueOnce({
        data: { songs: [{ Title: 'Fallback Song' }] },
      });

      const albumData = {}; // _id is missing
      render(<AlbumSongs show={true} albumData={albumData} />);

      await waitFor(() => {
        expect(screen.getByText('Fallback Song')).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        `${SERVER_URL}/albums/albumSong?search=undefined`
      );
    });

    test('handles albumData._id as empty string', async () => {
      // This test ensures that the component handles empty string album ids gracefully.
      axios.get.mockResolvedValueOnce({
        data: { songs: [{ Title: 'Empty Id Song' }] },
      });

      const albumData = { _id: '' };
      render(<AlbumSongs show={true} albumData={albumData} />);

      await waitFor(() => {
        expect(screen.getByText('Empty Id Song')).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        `${SERVER_URL}/albums/albumSong?search=`
      );
    });
  });
});